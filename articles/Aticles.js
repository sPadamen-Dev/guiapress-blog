const Sequelize = require("sequelize");
const connection = require("../databases/database");

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Article;
