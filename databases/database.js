const Sequelize = require("sequelize");

const connection = new Sequelize('guiapress', 'null', 'null',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;