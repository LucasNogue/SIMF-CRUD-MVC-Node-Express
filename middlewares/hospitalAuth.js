function hospitalAuth(req, res, next){
    if (req.session.hospital !=undefined){
        next();
    }else{
        res.redirect("/login");
    }
}

module.exports = hospitalAuth