'use strict'
const Message = use('App/Models/Message');
const Student = use('App/Models/Student');

class SendMessageController {
    async store({ params, request }) {
        const message = await Message.findBy("id", params.message_id);
        const students = request.input("students");
        message.student().attach(students);
    }
    async destroy() {
        const message = await Message.findBy("id", params.message_id);
        const students = request.input("students");
        message.student().sync(students);
    }
}

module.exports = SendMessageController
