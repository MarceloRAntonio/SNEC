'use strict'
const Student = use("App/Models/Student");

class StudentController {
  async index ({ request, response, view, params }) {
    const students = await Student.query()
      .where('class_id', params.class_id)
      .with("messages")
      .fetch();
    return students;

  }
  async store ({ request, response, params }) {
    const data = request.all();
    const student = await Student.create({...data, class_id: params.class_id,});
    return student;
  }
  async show ({ params, request, response, view }) {
    try {
      const student = await Student.findByOrFail('id', params.id);
      const messages = await student.messages().fetch();
      return Object.assign(student, messages);
      return student;
    } catch (error) {
      return response.status(error.status).json({error: "Estudante não encontrado"});
    }
  }
  async update ({ params, request, response }) {
    try {
      const student = await Student.findByOrFail('id', params.id);
      const data = request.all();
      student.merge(data);
      await student.save();
      return student;
    } catch (error) {
      return response.status(error.status).json({error: "Estudante não encontrado"});
    }
  }
  async destroy ({ params, request, response }) {
    try {
      const student = await Student.findByOrFail('id', params.id);
      await student.delete();
      return response.json({sucesso: "Estudente removido!"})
    } catch (error) {
      return response.status(error.status).json({error: "Estudante não encontrado"});
    }
  }
}

module.exports = StudentController
