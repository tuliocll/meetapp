'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventoParticipantesSchema extends Schema {
  up () {
    this.create('evento_participantes', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('evento_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('eventos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamp('signed_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('evento_participantes')
  }
}

module.exports = EventoParticipantesSchema
