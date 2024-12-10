const { Router } = require("express");
const router = Router();

const mysql = require("mysql");

const connection = mysql.createConnection({
    user: "user",
    password: "user",
    database: "chatbdd"
});

connection.connect((err) =>{
    if(err) throw err;

    console.log("Bdd Connected");

    app.set("bdd", connection);

    /*connection.query("select * from users", (err, result, fields) => {
        if(err){
            console.log(err);
        }else {
            console.log(result);
        }
    })*/

});

module.exports = router;