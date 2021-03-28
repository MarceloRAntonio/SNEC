'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageStudentSchema extends Schema {
  up () {
    this.create('message_students', (table) => {
      table.increments()
      table.integer('message_id')
        .unsigned()
        .references('id')
        .inTable('messages')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.integer('student_id')
        .unsigned()
        .references('id')
        .inTable('students')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('message_students')
  }
}

module.exports = MessageStudentSchema
