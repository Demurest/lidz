const Sequelize = require('sequelize')
const sequelize = require('../db/db.js')


const Deuda = sequelize.define('deuda', {
    institution: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    duedate: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

module.exports = Deuda;