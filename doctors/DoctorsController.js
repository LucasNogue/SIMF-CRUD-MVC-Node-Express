const express = require("express");
const Doctor = require("./Doctor");
const router = express.Router();

const hospitalAuth = require("../middlewares/hospitalAuth");
const doctorAuth = require("../middlewares/doctorAuth");

router.get("/hospital/doctors/new",hospitalAuth,(req, res) => {
    res.render("hospital/doctors/new");
});

router.post("/doctors/save", (req, res) => {
    var crm = req.body.crm;
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    if(crm && nome && email && senha  != undefined){
        
        Doctor.create({
            crm: crm,
            nome: nome,
            email: email,
            senha: senha,
            credencial:3,
            acesso:1,
            
        }).then(() => {
            res.redirect("/hospital/doctors");
        })

    }else{
        res.redirect("/hospital/doctors/new");
    }
});

router.get("/hospital/doctors",hospitalAuth, (req,res)=>{

    Doctor.findAll().then(doctors=>{
        res.render("hospital/doctors/index", {doctors: doctors});
    });
});

router.post("/doctors/delete", (req, res) => {
    var crm = req.body.crm;
    if(crm != undefined){
        if(!isNaN(crm)){
            Doctor.destroy({
                where: {
                    crm: crm
                }
            }).then(() => {
                res.redirect("/hospital/doctors");
            });
        }else{
            res.redirect("/hospital/doctors");
        }
    }else{ 
        res.redirect("/hospital/doctors");
    }
});

router.get("/hospital/doctors/edit/:crm",hospitalAuth,(req, res)=>{
    var crm = req.params.crm;

    if(isNaN(crm)){
        res.redirect("/hospital/doctors");
    }

    Doctor.findByPk(crm).then(doctor => {
        if (doctor != undefined){
            res.render("hospital/doctors/edit",{doctor: doctor});
        }else{
            res.redirect("/hospital/doctors");
        }
    }).catch(erro=>{
        res.redirect("/hospital/doctors");
    })
});

router.post("/doctors/update", (req, res) => {
    var crm = req.body.crm;
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    Doctor.update({  crm: crm,
        nome: nome,
        email: email,
        senha: senha,
        },{
        where: {
            crm: crm
        }
    }).then(() => {
        res.redirect("/hospital/doctors");    
    })
});

router.post("/doctors/changeDoctor/update", (req,res)=>{
    var email = req.body.email;
    var senha = req.body.senha;
    var crm = req.body.crm;
    Doctor.update({ 
        senha: senha
        },{
        where: {
            crm: crm,

        }
        
    }).then(() => {
        res.redirect("/login");   
    })
    
});

router.get("/doctors/changeDoctor",(req, res) => {
    
    Doctor.findAll().then(doctors=>{
         res.render("doctors/changeDoctor", {doctors: doctors ,dadosDoctor:req.session.dadosDoctor });
     });
    
 });

module.exports = router;