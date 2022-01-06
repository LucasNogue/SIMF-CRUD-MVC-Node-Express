const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sweetalert = require("sweetalert");
const qrcode = require("qrcode");
var pdf = require("html-pdf");
var ejs = require("ejs");
const session = require("express-session");



 
const connection = require("./database/database");

//Importando os controllers
const patientsController = require("./patients/PatientsController");
const bulletinsController = require("./bulletins/BulletinsControllers");
const doctorsController = require("./doctors/DoctorsController");
const hospitalsController = require("./hospitals/HospitalsController");

const Bulletin = require("./bulletins/bulletin");
const Doctor = require("./doctors/doctor");
const Patient = require("./patients/Patient");

//view engine

app.set('view engine','ejs');


app.use(session({
    secret: "qualquercoisa", cookie: { maxAge: 30000000 }
}))

//arquivos estaticos

app.use(express.static('public'));

//body Parser

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

//Usando rotas dos controllers
app.use("/", patientsController);
app.use("/", bulletinsController);
app.use("/", doctorsController);
app.use("/", hospitalsController);

app.get("/session",(req, res)=>{
    req.session.treinamento = "Formação Nodejs"
    req.session.ano = 2021
    req.session.email = "lucas@gmail240503.com"

    req.session.user = {
        username: "Lucas Nogueira",
        email: "lucas@gmail.com",
        id:10
    }
    res.send("Sessão gerada");
});

app.get("/leitura",(req, res)=>{
    res.json({
        treinamento : req.session.treinamento,
        ano : req.session.ano,
        email : req.session.email,
        user : req.session.user
    })
});


app.post("/scan/pdf",(req, res) => {
    var qrcode = req.body.qrcode;
    var nome = req.body.nome;
    var internacao = req.body.internacao;

    var conteudo = `
    <center>
    <h1> QRcode do paciente ${nome}  </h1>
    <h1> Número de internação: ${internacao} </h1>

    <img src='${qrcode}' alt="qrcode" height="512" width="512">
    </center>
    
    `
        pdf.create(conteudo,{}).toFile("../paciente.pdf",(err,res)=>{

            if (err){
                console.log("ERRO!");
            }else{
                console.log(res);     
                };
            })

    });

    app.post("/scan", (req, res, next) => {
        const input_text = req.body.text;
        const internacao = req.body.internacao;
        console.log(internacao);
    Patient.findByPk(internacao).then(patient => {
      
        qrcode.toDataURL(input_text, (err, src) => {
          if (err) res.send("Erro no carregamento!!");
          
          res.render("hospital/scan", {
            qr_code: src, patient: patient
          });   
        });

    }).catch(erro=>{
        res.redirect("/hospital/patients");
    })

        }  
      );

app.get("/", (req,res)=>{
    res.render("index");
});

app.listen(7000, () => {
    console.log("O servidor está rodando na porta 7000!")
})