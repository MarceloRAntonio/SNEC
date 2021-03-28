'use strict'
const User = use('App/Models/User')

class UserController {
    async index(){
        const users = await User.all()
        return users;
    }
    async store({request}) {
        const data = request.only(["name", "email", "password"]);
        const user = await User.findOrCreate({email: data.email }, data);
        return user;

    }
    async show({params, response}){
        try {
            const user = await User.findByOrFail("id", params.id);
            return user;  
        } catch (error) {
            return response.status(error.status).json({erro: "Usuário não Encontrado"})
        }
    }
    async update({request, params, response}){

        try {
            const data = request.only(["name", "email", "password"]);
            const user = await User.findByOrFail('id', params.id);
            user.merge(data);
            await user.save();
            return user;
        } catch (error) {
            return response.status(error.status).json({erro: "Usuário não Encontrado"})
        }

    }
    async destroy({params, response}){
        try {
            const user = await User.findByOrFail('id', params.id);
            await user.delete();
            return response.json({sucesso: "Usuário Removido"})
        } catch (error) {
            return response.status(error.status).json({erro: "Usuário não Encontrado"})
        }
    }
}

module.exports = UserController
