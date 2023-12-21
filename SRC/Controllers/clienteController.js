const Client = require('../models/clientModel')
const Deuda = require('../models/deudaModel')
const Message = require('../models/messageModel')
const { Op } = require('sequelize');

exports.getClients = async (ctx) =>{
    try{
        const query = await Client.findAll();
        ctx.body = query
    }catch (err){
        ctx.status = 500;
        ctx.body = { error: err.message };
    }
}

exports.createClient = async (ctx) => {
    try{
        const {nombre, rut, salario, ahorros, messages, debts} = ctx.request.body;
        const newClient = await Client.create({nombre, rut, salario, ahorros})


        messages.forEach(async (messageData) => {
            await Message.create({
                text: messageData.text,
                role: messageData.role,
                sentat: messageData.sentat,
                clientId: newClient.id, // Asociación con el cliente recién creado
            });
        });

        debts.forEach(async (debtData) => {
            await Deuda.create({
                clientId: newClient.id,
                institution: debtData.institution,
                amount: debtData.amount,
                duedate: debtData.duedate
            })
        })

        ctx.status = 200;
        ctx.body = { "status": "ok" };
    }catch (err){
        ctx.status = 500;
        ctx.body = { error: err.message };
    }
}

exports.getClientInfo = async (ctx) => {
    try{
        const clientId = ctx.params.clientId
        const client = await Client.findOne({
            where: { id: clientId },
            include: [
                { model: Deuda },
                { model: Message }
            ]
        })

        if (!client) {
            ctx.status = 404;
            ctx.body = { error: 'Cliente no encontrado' };
            return;
          }
      
        ctx.status = 200;
        ctx.body = client;
    } catch (err){
        ctx.status = 500;
        ctx.body = { error: err.message };
    }
}

exports.getClientsFollowUp = async (ctx) => {
    try{
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const clientsWithMessage = await Client.findAll({
            include: [{
                model: Message,
                where: {
                    sentat:{
                        [Op.lt]: sevenDaysAgo // Busca los mensajes con mas de 7 dias de diferencia
                    }
                },
                order: [['sentat','DESC']],
                limit: 1
            }]
        })

        const clients = clientsWithMessage.filter(client => client.messages.length>0)

        ctx.status = 200
        ctx.body = clients
    } catch(err){
        ctx.status = 500;
        ctx.body = { error: err.message };
    }
}