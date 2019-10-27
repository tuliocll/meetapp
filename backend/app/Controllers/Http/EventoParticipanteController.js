'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Participante = use('App/Models/EventoParticipante')
const Evento = use('App/Models/Evento')

const { isBefore, isEqual, setMilliseconds, parseJSON } = require('date-fns')

/**
 * Resourceful controller for interacting with eventoparticipantes
 */
class EventoParticipanteController {
  /**
   * Show a list of all eventoparticipantes.
   * GET eventoparticipantes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, params }) {
    try {
      const participantes = await Participante.query()
        .where('evento_id', params.eventos_id)
        .with('user')
        .fetch()

      return participantes
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Erro ao listar usuarios, tente novamente' }
      })
    }
  }

  /**
   * Create/save a new eventoparticipante.
   * POST eventoparticipantes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ response, params, auth }) {
    try {
      const data = {
        user_id: auth.user.id,
        evento_id: params.eventos_id,
        signed_at: new Date()
      }

      const evento = await Evento.findOrFail(params.eventos_id)

      if (isBefore(parseJSON(evento.date), new Date())) {
        return response.status(400).send({
          error: { message: 'Este meetup já inicou!' }
        })
      }

      if (evento.user_id === auth.user.id) {
        return response.status(401).send({
          error: { message: 'Sem permissão!' }
        })
      }

      const checkMeetup = await Participante.query()
        .where('user_id', auth.user.id)
        .where('evento_id', params.eventos_id)
        .first()

      if (checkMeetup) {
        return response.status(400).send({
          error: { message: 'Usuario já inscrito!' }
        })
      }

      const participando = await Participante.query()
        .where('user_id', auth.user.id)
        .fetch()

      const meetups = participando.toJSON()

      for (let i = 0; i < meetups.length; i++) {
        const checkHour = await Evento.find(meetups[i].evento_id)

        const meetup = checkHour.toJSON()

        if (
          isEqual(
            setMilliseconds(parseJSON(meetup.date), 0),
            setMilliseconds(parseJSON(evento.date), 0)
          )
        ) {
          return response.status(400).send({
            error: {
              message: 'Você já tem um meetup nesse horario!'
            }
          })
        }
      }

      const participante = await Participante.create(data)

      return participante
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Erro ao se cadastrar, tente novamente'
        }
      })
    }
  }

  /**
   * Display a single eventoparticipante.
   * GET eventoparticipantes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    try {
      const evento = await Participante.findOrFail(params.id)

      return evento
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Usuario não encontrado' }
      })
    }
  }

  /**
   * Update eventoparticipante details.
   * PUT or PATCH eventoparticipantes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const participante = await Participante.findOrFail(params.id)
      const data = request.only(['user_id', 'evento_id', 'signed_at'])

      participante.merge(data)

      await participante.save()

      return participante
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Erro ao atualizar usuario, tente novamente' }
      })
    }
  }

  /**
   * Delete a eventoparticipante with id.
   * DELETE eventoparticipantes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
      const participante = await Participante.findOrFail(params.id)

      const evento = await Evento.findOrFail(params.eventos_id)

      if (isBefore(parseJSON(evento.date), new Date())) {
        return response.status(400).send({
          error: { message: 'Você não pode cancelar meetups passados!' }
        })
      }

      await participante.delete()
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Erro ao cancelar inscrição, tente novamente' }
      })
    }
  }
}

module.exports = EventoParticipanteController
