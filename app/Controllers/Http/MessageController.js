'use strict'
const Message = use('App/Models/Message');

class MessageController {
  async index ({ request, response, view }) {
    const messages = await Message.all();
    return messages;
  }
  async store ({ request, response, auth }) {
    const data = request.all();
    const message = await Message.create({...data, user_id: auth.user.id});
    return message;
  }
  async show ({ params, request, response, view }) {
    try {
      const message = await Message.findByOrFail('id', params.id);
      return message;
    } catch (error) {
      return response.status(error.status).json({error: "Menssagem não encontrada"})
    }
  }
  async update ({ params, request, response }) {
    try {
      const message = await Message.findByOrFail('id', params.id);
      const data = request.all();
      message.merge(data);
      await message.save();
      return message;
    } catch (error) {
      return response.status(error.status).json({error: "Menssagem não encontrada"})
    }
  }
  async destroy ({ params, request, response }) {
    try {
      const message = await Message.findByOrFail('id', params.id);
      await message.delete();
      return response.json({sucesso: "Menssagem excluida com sucesso!!!"});
    } catch (error) {
      return response.status(error.status).json({error: "Menssagem não encontrada"})
    }
  }
}

module.exports = MessageController
