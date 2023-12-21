const Sequelize = require('sequelize')
const sequelize = require('../db/db.js')


const Message = sequelize.define('message', {
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sentat: {
        type: Sequelize.DATE,
        allowNull: false
    }
})


module.exports = Message;