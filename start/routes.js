'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
  Route.resource("/user", "UserController");
}).middleware("auth");

Route.post("/session", "SessionController.store");
