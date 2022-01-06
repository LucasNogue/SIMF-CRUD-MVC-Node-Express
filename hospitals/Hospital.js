const Sequelize = require("sequelize");
const connection = require("../database/database");

const Hospital = connection.define('hospitals',{
    razao_social:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
    nome:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
    cnpj: {
        type: Sequelize.INTEGER(14),
        allowNull: false
    },
    email:{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false    
    },
    credencial: {
        type: Sequelize.INTEGER(3),
        allowNull: false
    }
})

//Hospital.sync({force:true});
module.exports = Hospital;