'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Student extends Model {

  Class() {
    return this.belongsTo('App/Models/Class');
  }
  messages() {
    return this.belongsToMany('App/Models/Message').pivotModel('App/Models/MessageStudent');
  }
}

module.exports = Student
