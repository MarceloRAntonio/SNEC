'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/class/:class_id/student/:id', "StudentController.show");
Route.group(() => {
  Route.resource("/user", "UserController");
  Route.resource('/class', "ClassController");
  Route.resource('/class.student', "StudentController");
  Route.resource('/message', "MessageController");
  Route.resource('/message.student', "SendMessageController");
}).middleware("auth");

Route.post("/session", "SessionController.store");
