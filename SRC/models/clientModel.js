const Sequelize = require('sequelize')
const sequelize = require('../db/db.js')
const Deuda = require('./deudaModel.js')
const Message = require('./messageModel.js')

const Client = sequelize.define('client', {
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rut: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ahorros: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Client.hasMany(Deuda)
Client.hasMany(Message)
Deuda.belongsTo(Client);
Message.belongsTo(Client);

module.exports = Client;