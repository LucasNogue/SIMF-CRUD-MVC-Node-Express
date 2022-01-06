function patientAuth(req, res, next){
    if (req.session.patient !=undefined){
        next();
    }else{
        res.redirect("/login");
    }
}

module.exports = patientAuth