const Sequelize = require("sequelize");
const connection = require("../database/database");
const moment = require('moment');
const Patient = connection.define('patients',{

    internacao: {
        type: Sequelize.INTEGER(10),
        allowNull: false,  
        autoIncrement: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
    nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        get: function() {
            return moment(this.getDataValue('nascimento')).format('DD.MM.YYYY')
            }  
    },
    quarto: {
    type: Sequelize.INTEGER(4),
    allowNull: false    
    },
    leito: {
        type: Sequelize.INTEGER(3),
        allowNull: false    
    },
    email:{
        type: Sequelize.STRING(62),
        allowNull: false
    },senha: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    credencial: {
        type: Sequelize.INTEGER(3),
        allowNull: false
    },
    crm: {
        type: Sequelize.INTEGER(6),
        allowNull: false    
    },
    data:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    acesso: {
        type: Sequelize.INTEGER(40),
        allowNull: false
    },
  
})

//Patient.sync({force:true});
module.exports = Patient;