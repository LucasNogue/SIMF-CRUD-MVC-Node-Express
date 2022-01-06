const express = require("express");
const Patient = require("./Patient");
const router = express.Router();
const hospitalAuth = require("../middlewares/hospitalAuth");
const patientAuth = require("../middlewares/patientAuth");

router.get("/hospital/patients/new",hospitalAuth,(req, res) => {
    res.render("hospital/patients/new");
});

router.post("/patients/save", (req, res) => {
    var internacao = req.body.internacao;
    var nome = req.body.nome;
    var nascimento = req.body.nascimento;
    var quarto = req.body.quarto;
    var leito = req.body.leito;
    var email = req.body.email;
    var senha = req.body.senha;
    var crm = req.body.crm;
    var data = req.body.data;

    if(internacao && nome && nascimento && quarto && leito && email && senha && crm && data  != undefined){
        
        Patient.create({
            internacao: internacao,
            nome: nome,
            nascimento: nascimento,
            quarto: quarto,
            leito: leito,
            email: email,
            senha: senha,
            credencial: 1,
            crm: crm,
            data:data,
            acesso:1

        }).then(() => {
            res.redirect("/hospital/patients");
        })

    }else{
        res.redirect("/hospital/patients/new");
    }
});

router.get("/hospital/patients",hospitalAuth, (req,res)=>{
    Patient.findAll().then(patients=>{
        res.render("hospital/patients/index", {patients: patients});
    });
});

router.post("/patients/delete", (req, res) => {
    var internacao = req.body.internacao;
    if(internacao != undefined){
        if(!isNaN(internacao)){
            Patient.destroy({
                where: {
                    internacao: internacao
                }
            }).then(() => {
                res.redirect("/hospital/patients");
            });
        }else{// NÃO FOR UM NÚMERO
            res.redirect("/hospital/patients");
        }
    }else{ // NULL
        res.redirect("/hospital/patients");
    }
});

router.get("/hospital/patients/edit/:internacao",hospitalAuth,(req, res)=>{
    var internacao = req.params.internacao;
    if(isNaN(internacao)){
        res.redirect("/hospital/patients");
    }

    Patient.findByPk(internacao).then(patient => {
        if (patient != undefined){
            res.render("hospital/patients/edit",{patient: patient});
        }else{
            res.redirect("/hospital/patients");

        }
    }).catch(erro=>{
        res.redirect("/hospital/patients");
    })
});

router.post("/patients/update", (req, res) => {
    var internacao = req.body.internacao;
    var nome = req.body.nome;
    var nascimento = req.body.nascimento;
    var quarto = req.body.quarto;
    var leito = req.body.leito;
    var email = req.body.email;
    var senha = req.body.senha;
    var crm = req.body.crm;
    var data = req.body.data;

    Patient.update({  internacao: internacao,
        nome: nome,
        nascimento: nascimento,
        quarto: quarto,
        leito: leito,
        email: email,
        senha: senha,
        
        crm: crm,
        data:data },{
        where: {
            internacao: internacao
        }
    }).then(() => {
        res.redirect("/hospital/patients");    
    })

});


router.post("/patients/changePatient/update", (req,res)=>{
    var email = req.body.email;
    var senha = req.body.senha;
    var internacao = req.body.internacao;
    Patient.update({ 
        senha: senha
        },{
        where: {
            internacao: internacao,

        }
        
    }).then(() => {
        res.redirect("/login");   
    })
    
});

router.get("/patients/changePatient",(req, res) => {
    Patient.findAll().then(patients=>{
         res.render("patients/changePatient", {patients: patients ,dadosPatient:req.session.dadosPatient });
     });
    
 });

module.exports = router;