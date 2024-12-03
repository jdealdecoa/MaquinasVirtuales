
const { Router } = require("express");
const router = Router();


router.get("/login", (req, res) => {  //toda la url

    res.sendFile(__dirname + "/login.html");

});

router.get("/register", (req, res) => {  //toda la url

    res.send("Tittle: ola esto es register xd"); 

});




module.exports = router; 