'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassSchema extends Schema {
  up () {
    this.create('classes', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('course').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('classes')
  }
}

module.exports = ClassSchema
