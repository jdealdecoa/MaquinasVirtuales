const { Router } = require("express");
const router = Router();


router.get("/", (req, res) => {  //toda la url

    res.send("Tittle: Hello world"); 

});

router.use("/user", require("./login"));

//Cargamos nuestro codigo de prueba de bases de datos
router.use("/bdd", require("./bddCalls"));


module.exports = router; 