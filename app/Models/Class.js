'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Class extends Model {

    students() {
        return this.hasMany('App/Models/Student');
    }
}

module.exports = Class
