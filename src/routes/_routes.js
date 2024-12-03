const { Router } = require("express");
const router = Router();


router.get("/", (req, res) => {  //toda la url

    res.send("Tittle: Hello world"); 

});

router.use("/user", require("./login"));


module.exports = router; 