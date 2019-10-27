'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Evento = use('App/Models/Evento')

const { parseJSON, isBefore } = require('date-fns')

/**
 * Resourceful controller for interacting with eventos
 */
class EventoController {
  /**
   * Show a list of all eventos.
   * GET eventos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    const { page, date } = request.get()

    if (!date) {
      return response.status(400).send({
        error: { message: 'Erro de validação' }
      })
    }

    const eventos = await Evento.query()
      .whereRaw('DATE(date) = ?', date)
      .with('user', builder => {
        builder.select('id', 'name')
      })
      .with('foto', builder => {
        builder.select('id', 'name')
      })
      .with('participantes', builder => {
        builder.select('user_id', 'evento_id')
      })
      .paginate(page, 10)

    return eventos
  }

  /**
   * Create/save a new evento.
   * POST eventos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only([
      'title',
      'description',
      'date',
      'location',
      'file_id'
    ])

    if (isBefore(parseJSON(data.date), new Date())) {
      return response.status(400).send({
        error: { message: 'Você não pode criar meetups com data retroativa' }
      })
    }

    const evento = await Evento.create({ ...data, user_id: auth.user.id })

    return evento
  }

  /**
   * Display a single evento.
   * GET eventos/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    try {
      const evento = await Evento.findOrFail(params.id)

      await evento.load('user')
      await evento.load('participantes')
      await evento.load('foto')

      return evento
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Este evento não existe!' }
      })
    }
  }

  /**
   * Update evento details.
   * PUT or PATCH eventos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      const evento = await Evento.findOrFail(params.id)
      const data = request.only([
        'title',
        'description',
        'file_id',
        'data',
        'location'
      ])

      if (isBefore(parseJSON(evento.date), new Date())) {
        return response.status(400).send({
          error: { message: 'Você não pode modificar meetups já iniciados!' }
        })
      }

      if (evento.user_id !== auth.user.id) {
        return response.status(401).send({
          error: { message: 'Sem permissão!' }
        })
      }

      evento.merge(data)

      await evento.save()

      return evento
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Este evento não existe!' }
      })
    }
  }

  /**
   * Delete a evento with id.
   * DELETE eventos/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
      const evento = await Evento.findOrFail(params.id)

      await evento.delete()
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Este evento não existe!' }
      })
    }
  }
}

module.exports = EventoController
