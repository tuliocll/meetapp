'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFileIdToUserSchema extends Schema {
  up () {
    this.alter('users', table => {
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.alter('users', table => {
      table.dropColumn('file_id')
    })
  }
}

module.exports = AddFileIdToUserSchema
