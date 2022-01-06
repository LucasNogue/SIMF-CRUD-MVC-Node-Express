const Sequelize = require("sequelize");
const connection = require("../database/database");

const Doctor = connection.define('doctors',{
    crm:{
        type: Sequelize.INTEGER(6),
        allowNull: false,  
        autoIncrement: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(62),
        allowNull: false
    },
 
    senha: {
        type: Sequelize.STRING(62),
        allowNull: false
    },
    credencial: {
        type: Sequelize.INTEGER(3),
        allowNull: false
    },
    acesso: {
        type: Sequelize.INTEGER(40),
        allowNull: false
    },
})


//Doctor.sync({force:true});
module.exports = Doctor;