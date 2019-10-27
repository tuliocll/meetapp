'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventoSchema extends Schema {
  up () {
    this.create('eventos', table => {
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
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.timestamp('date').notNullable()
      table.string('location')
      table.timestamps()
    })
  }

  down () {
    this.drop('eventos')
  }
}

module.exports = EventoSchema
