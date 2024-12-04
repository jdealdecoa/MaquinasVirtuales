//Init app 
//Cargo la clase del archivo
const express = require("express");

//Llamo al constructor
const app = express();

//seccion de variables de configuracion 
app.set("port", process.PORT || 3000); //a la variable port, voy a que coja el puerto del proceso actual, si tenemos un servidor hecho pillará el puerto, pero si estamos en local, cogerá el 3000. 
app.set ("json spaces", 2); //configuramos el comportamiento

//Middlewares
const morgan = require ("morgan"); 

app.use(morgan("dev"));
//app.use(morgan("combined"));

//configuracion adicional de express
app.use(express.urlencoded({extended: false}));
app.use(express.json()); //si no le decimos a express que puede usar json, no podrá recibir y enviar json

//clases auxiliares
const ipHelper = require("ip");
const qrcode = require("qrcode-terminal"); //crea codigo qr con la web q acabamos de hacer

//Declaramos la carpeta pública
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

//Cargamos nuestro enrutador de URLS
app.use(require("./routes/_routes"));



app.listen(app.get("port"), () => {

    const ip = ipHelper.address();
    const port = app.get("port"); 

    const url = "http://" + ip + ":" + port + "/";

    console.log("servidor arrancado en la url: " + url); 

    qrcode.generate(url, {small: true},
    (qrcode) => {
        console.log(qrcode);
    });
});
