'use strict'

const User = use('App/Models/User')
const Participante = use('App/Models/EventoParticipante')
const Evento = use('App/Models/Evento')

const Hash = use('Hash')

class UserController {
  async store ({ request }) {
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async update ({ request, response, auth }) {
    try {
      const user = await User.query()
        .with('avatar')
        .where('id', auth.user.id)
        .first()

      const data = request.only([
        'name',
        'email',
        'file_id',
        'oldPassword',
        'password',
        'confirmPassword'
      ])

      if (data.email && data.email !== user.email) {
        const checarEmail = await User.findBy('email', data.email)
        if (checarEmail) {
          return response.status(401).send({
            error: { message: 'Email já cadastrado' }
          })
        }
      }

      if (data.oldPassword) {
        const verifyPassword = await Hash.verify(
          data.oldPassword,
          user.password
        )

        if (!verifyPassword) {
          return response.status(400).json({
            message: 'Current password could not be verified! Please try again.'
          })
        }
      }

      user.merge({
        name: data.name,
        email: data.email,
        file_id: data.file_id,
        password: data.password
      })

      await user.save()

      const retorno = await User.query()
        .with('avatar')
        .where('id', auth.user.id)
        .select('id', 'name', 'email', 'file_id')
        .first()

      return retorno
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Este usuario não existe!' }
      })
    }
  }

  async index ({ response, auth }) {
    try {
      const eventos = Participante.query()
        .with('evento.foto', builder => {
          builder.select('id', 'name')
        })
        .with('evento.user', builder => {
          builder.select('id', 'name')
        })
        .where('user_id', auth.user.id)
        .fetch()

      return eventos
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Este usuario não existe!' }
      })
    }
  }

  async findByUser ({ response, params, auth }) {
    try {
      const eventos = Evento.query()
        .with('foto', builder => {
          builder.select('id', 'name')
        })
        .with('user', builder => {
          builder.select('id', 'name')
        })
        .where('user_id', auth.user.id)
        .paginate(params.page, 5)

      return eventos
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Este usuario não existe!' }
      })
    }
  }
}

module.exports = UserController
