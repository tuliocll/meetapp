'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EventoParticipante extends Model {
  static boot () {
    super.boot()

    this.addHook(
      'afterCreate',
      'EventoParticipanteHook.sendNewParticipanteMail'
    )
    this.addHook(
      'beforeUpdate',
      'EventoParticipanteHook.sendNewParticipanteMail'
    )
  }

  evento () {
    return this.belongsTo('App/Models/Evento')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = EventoParticipante
