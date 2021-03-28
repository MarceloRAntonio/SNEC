'use strict'

const Class = use ("App/Models/Class");


class ClassController {
 async index ({ request, response, view }) {
   const classes = await Class.query().with("students").fetch();
   return classes;
 }
 async store ({ request, response }) {
   const { name, course } = request.only(["name", "course"]);
   const turma = await Class.create({ name, course });
   return turma;
 }
 async show ({ params, request, response, view }) {
   try {
    const turma = await Class.findByOrFail('id', params.id);
    const students = await turma.students().fetch();
    return Object.assign(turma, students);

    return turma;
   } catch (error) {
     return response.status(error.status).json({ error: "Turma não encontrada" });
   }
 }
 async update ({params, request, response }) {
  try {
    const turma = await Class.findByOrFail("id", params.id);
    const { name, course } = request.only(["name", "course"]);
    turma.merge({name, course})
    await turma.save();
    return turma;
  } catch (error) {
    return response.status(error.status).json({ error: "Turma não encontrada" });
  }
 }
 async destroy ({params, request, response }) {
  try {
    const turma = await Class.findByOrFail("id", params.id);
    await turma.delete();
    return response.json({sucesso: "Turma Removida"})
  } catch (error) {
    return response.status(error.status).json({ error: "Turma não encontrada" });
  }
 }
}

module.exports = ClassController
