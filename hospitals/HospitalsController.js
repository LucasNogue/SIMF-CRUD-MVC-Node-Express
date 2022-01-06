const express = require("express");
const qrcode = require("qrcode");
const router = express.Router();
const Hospital = require("../hospitals/Hospital")
const Doctor = require("../doctors/Doctor");
const Patient = require("../patients/Patient");
const bcrypt = require('bcryptjs');

router.get("/hospital/new",(req, res) => {
    res.render("hospital/new");
});

router.post("/hospitals/save", (req, res) => {
    var razao_social = req.body.razao_social;
    var nome_fantasia = req.body.nome_fantasia;
    var cnpj = req.body.cnpj;
    var email = req.body.email;
    var senha = req.body.senha;

    if(razao_social && nome_fantasia && cnpj && email  && senha  != undefined){
        
        Hospital.create({
            razao_social: razao_social,
            nome: nome_fantasia,
            email: email,
            password: senha,
            cnpj: cnpj,
            credencial:2,
            
            
        }).then(() => {
            res.redirect("/login");
        })

    }else{
        res.redirect("/login");
    }
});

router.get("/login", (req,res)=>{
    res.render("hospital/login");
});

router.post("/authenticate", (req, res)=>{
    var email = req.body.email;
    var password = req.body.password;

        Hospital.findOne({where:{email: email}}).then(hospital=>{
        var credencialHospital = 2;
        console.log(email);
        var credencialH = hospital.credencial;
        if (credencialH == credencialHospital){
            if (hospital !=undefined){
                var correctH = false;
                if(password == hospital.password){
                    correctH = true;
                    
                }
    
                if(correctH){
                    req.session.hospital = {
                        id: hospital.id,
                        email: hospital.email
                    }
                    res.redirect("/hospital/patients");
                }else{
                    res.redirect("/login"); 
                }
            }else{
                res.redirect("/login");
            } 
        }
        });

        Doctor.findOne({where:{email: email}}).then(doctor=>{
            var credencialDoctor = 3;
            
            credencialD = doctor.credencial;
            if(credencialD == credencialDoctor){
            if (doctor !=undefined){
                var correctD = false;
                if(password == doctor.senha){
                    correctD = true;
                }
                if(correctD){
                    req.session.doctor = {
                        crm: doctor.crm,
                        email: doctor.email,
                    };
                    req.session.dadosDoctor = {
                        nome: doctor.nome,
                        email: doctor.email,
                        senha: doctor.senha,
                        crm: doctor.crm,
                    };
                    var acessoD = doctor.acesso;
                    Doctor.update({ 
                        acesso: acessoD + 1
                        },{
                        where: {
                            crm: doctor.crm,
                            acesso: acessoD
                        }
                        
                    })  
                    
                    if(acessoD==1){
                        //res.json(req.session.doctor);
                        res.redirect("/doctors/changeDoctor");
                    }else{
                        res.redirect("/doctors/bulletins");
                    }
                }else{
                    res.redirect("/login"); 
                }
            }else{
                res.redirect("/login");
            } 
        }
        });
    
    Patient.findOne({where:{email: email}}).then(patient=>{
        var credencialPatient = 1;

        credencialP = patient.credencial;
        if(credencialP == credencialPatient){
        if (patient !=undefined){
            var correctP = false;
            if(password == patient.senha){
                correctP = true;
            }
            if(correctP){
                req.session.patient = {
                    internacao: patient.internacao,
                    email: patient.email,
                }
                
                req.session.idP= patient.internacao;

                req.session.dadosPatient = {
                    email: patient.email,
                    senha: patient.senha,
                    internacao: patient.internacao,
                };

                var acessoP = patient.acesso;
                Patient.update({ 
                    acesso: acessoP + 1
                    },{
                    where: {
                        internacao: patient.internacao,
                        acesso: acessoP
                    }
                    
                })  

                if(acessoP==1){
                    //res.json(req.session.doctor);
                    res.redirect("/patients/changePatient");
                }else{
                    res.redirect("/patients");
                }
            }else{
                res.redirect("/login"); 
            }
        }else{
            res.redirect("/login");
        } 
    }
    });   
});

router.get("/logout", (req, res) => {
    req.session.patient = undefined;
    req.session.doctor = undefined;
    req.session.hospital = undefined;
    res.redirect("login");
})

module.exports = router;