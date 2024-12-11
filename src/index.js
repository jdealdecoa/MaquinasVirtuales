//Init app 
//Cargo la clase del archivo
const express = require("express");

//Llamo al constructor
app = express();

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



// en vez de utilizar la app de express, que al hacer un listen nos abre un servidor que escucha llamadas http, vamos a 
// levantar un servidor que ademas tambien escucha conexiones de webSockets
const http = require("http");
const server = http.createServer(app);

const {Server} = require("socket.io");
const io = new Server(server); 
app.set("io", io); 

//Cargamos nuestro enrutador de URLS
app.use(require("./routes/_routes"));

server.listen(app.get("port"), () => {

    const ip = ipHelper.address();
    const port = app.get("port"); 

    const url = "http://" + ip + ":" + port + "/";

    console.log("servidor arrancado en la url: " + url); 

    qrcode.generate(url, {small: true},
    (qrcode) => {
        console.log(qrcode);
    });
});
