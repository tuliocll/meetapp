'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Evento extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  participantes () {
    return this.hasMany('App/Models/EventoParticipante')
  }

  foto () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Evento
