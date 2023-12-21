const sequelize = require('./db')
const Client = require('../models/clientModel');
const Message = require('../models/messageModel');
const Deuda = require('../models/deudaModel');

const { error } = require('console');

sequelize.sync({force: true})
.then(() =>{
    console.log('Tablas sincronizadas');
})
.catch(err => {
    console.error("Error al sincronizar las tablas: ", err);
})