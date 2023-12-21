const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'ytz', //BDD
    'postgres', //USUARIO
    'admin', //CLAVE
    {
    host: 'localhost',
    dialect: 'postgres',
  });

module.exports = sequelize;