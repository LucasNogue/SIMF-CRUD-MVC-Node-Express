function doctorAuth(req, res, next){
    if (req.session.doctor !=undefined){
        next();
    }else{
        res.redirect("/login");
    }
}

module.exports = doctorAuth