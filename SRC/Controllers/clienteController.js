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

exports.getCalculatedClient = async (ctx) =>{
    /**El propósito de este método es determinar si un cliente puede acceder a la compra de un producto. Se realiza asignando valores entre 0 y 25 a los siguientes aspectos:

    1. Cantidad de mensajes.
    2. Ahorros acumulados hasta la fecha.
    3. Monto de deudas.
    4. Salario del cliente.

    Una vez asignados los valores respectivos a cada aspecto, se suman para obtener un total que determinará la viabilidad de la compra.
     */

    try{
        let pesoMessage = 0
        let pesoAhorro = 0
        let pesoAmount = 0
        let pesoSalario = 0

        const clientId = ctx.params.clientId
        const client = await Client.findOne({
            where: { id: clientId },
            include: [
                { model: Deuda },
                { model: Message }
            ]
        })

        /*para medir el peso de los mensajes*/
        if(client.messages.length < 1){
            pesoMessage = 0
        }
        if(client.messages.length > 5){
            pesoMessage = 10
        }
        if(client.messages.length > 10){
            pesoMessage = 25
        }

        /*para medir el peso de los ahorros*/
        if(client.ahorros < 1000000){
            pesoAhorro = 0
        }
        if(client.ahorros > 5000000){
            pesoAhorro = 10
        }
        if(client.ahorros > 10000000){
            pesoAhorro = 25
        }

        /**para medir el peso de las deudas */
        if(client.deudas.amount < 1000000){
            pesoAmount = 25
        }
        if(client.deudas.amount > 5000000){
            pesoAmount = 10
        }
        if(client.deudas.amount > 10000000){
            pesoAmount = 0
        }

        /**para medir el peso del salario */
        if(client.salario < 1000000){
            pesoSalario = 0
        }
        if(client.salario > 1000000 && client.salario < 1500000){
            pesoSalario = 10
        }
        if(client.salario > 1500000){
            pesoSalario = 25
        }

        const resultadoFinal = pesoMessage + pesoAhorro + pesoAmount + pesoSalario

        ctx.status = 200
        ctx.body = { "score": resultadoFinal}
    } catch (err){
        ctx.status = 500;
        ctx.body = { error: err.message };
    }
}