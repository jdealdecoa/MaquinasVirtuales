
const { Router } = require("express");
const router = Router();


router.get("/login", (req, res) => {  //toda la url

    res.sendFile(__dirname + "/login.html");

});

router.get("/register", (req, res) => {  //toda la url

    res.send( "Tu usuario es: " + req.query.username + " y tu password es: " + req.query.password);


});

router.post("/register", (req, res) => {  //toda la url

    const bdd = app.get("bdd");
    bdd.query(" call CreateUser('" + req.body.username + "','" + req.body.password + "');", (error, result, fields) => {
        
        if(error){
            res.send(error);
        } else {
            res.send(result);
        }

    });

    //es.send( "aa " + this.apply.get ("port") + "aaa");


});




module.exports = router; 