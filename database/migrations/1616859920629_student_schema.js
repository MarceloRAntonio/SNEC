'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments()
      table.string('registration').notNullable().unique()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('cpf').notNullable().unique()
      table.integer('class_id')
        .unsigned()
        .references('id')
        .inTable('classes')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentSchema
