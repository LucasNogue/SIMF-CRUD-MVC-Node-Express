const Sequelize = require("sequelize");
const moment = require('moment');
const connection = require("../database/database");
const Patient = require("../patients/Patient");
const Doctor = require("../doctors/Doctor");

const Bulletin = connection.define('bulletins',{
    
    id:{
        type: Sequelize.INTEGER(100),
        autoIncrement: true,
        primaryKey: true,
    },
    data:{
        type: Sequelize.DATEONLY,
        allowNull: false,
        autoIncrement: false,
        get: function() {
        return moment(this.getDataValue('data')).format('DD.MM.YYYY')
        }
    },
    body: {
        type: Sequelize.STRING(350),
        allowNull: false
    }
})

//Doctor.hasMany(Patient);
//Patient.belongsTo(Doctor);
Patient.hasMany(Bulletin); // Um paciente tem muitos boletins
Bulletin.belongsTo(Patient); // Um Boletim pertence a um paciente

//Bulletin.sync({force:true});
module.exports = Bulletin;