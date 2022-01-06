const { response } = require("express");
const express = require("express");
const Patient = require("../patients/Patient");
const router = express.Router();
const Bulletin = require("./Bulletin");
const doctorAuth = require("../middlewares/doctorAuth");
const patientAuth = require("../middlewares/patientAuth");

router.get("/doctors/bulletins/new" ,(req ,res) => {
    Patient.findAll().then(patients => {
        res.render("doctors/bulletins/new",{patients: patients})
    })    
})

router.post("/bulletins/save", (req, res) => {
    var data = req.body.data;
    var body = req.body.body;
    //var patient = req.body.patient;
    var patientInternacao = req.body.patientInternacao;

    Bulletin.create({
        data: data,
        body: body,
        patientInternacao: patientInternacao
    }).then(() => {
        
    });
});

router.get("/doctors/bulletins", doctorAuth , (req,res)=>{

    Patient.findAll({
        include:[{model: Bulletin}]
    }).then(patients=>{
        res.render("doctors/bulletins/index", {patients: patients});
       
    });
});

router.get("/doctors/bulletins/:internacao",doctorAuth,(req,res)=>{
    var internacao = req.params.internacao;
    Patient.findOne({
        include:[{model: Bulletin}],
        where: {internacao: internacao}
    }).then(internacao =>{
        if(internacao != undefined){
            res.render("doctors/bulletins/new",{
                internacao:internacao
            });
        }else{
            res.redirect("/doctors/bulletins")
        }
    })
})

router.get("/patients",patientAuth,(req, res) => {
   var idP =req.session.idP;
    Bulletin.findAll({
        include:[{model: Patient}],
        where: {patientInternacao:idP }
        
    }).then(bulletins =>{
        res.render("patients", {bulletins: bulletins,idP:req.session.idP});
    });
});

router.get("/patients/:id",(req, res) => {
    var id = req.params.id;
    Bulletin.findOne({
        where: {
            id: id
        }
    }).then(bulletin => {
        if(bulletin != undefined){
            Patient.findAll().then(patients => {
                res.render("patients/bulletin", {bulletin: bulletin, patients: patients});
            });
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    });
})

module.exports = router;