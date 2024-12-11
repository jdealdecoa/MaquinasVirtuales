const {Router} = require("express");
const router = Router();

router.get("/", (req,res) => {

    res.sendFile(__dirname + "/chat.html");

});

const io = app.get("io");

var messages = [];

io.on("connection", (socket) => {

    var adress = socket.request.connection;
    console.log ("socket Connected with IP:Port -->"
        + adress.remoteAdress + ":" + adress.remotePort);

    socket.on("ChatMessageClientToServer", (message) => {

        //Socket emit ,envia el evento a un solo socket en concreto 
        // socket.emit("ChatMessageServerToClient", message);

        //io emit, envia el evento a todos los sockets conectados(Broadcast)
        io.emit("ChatMessageServerToClient", message);

        messages.push(message);

    });


    socket.on("GetInitialMessages", () =>{
        socket.emit("InitialMessages", messages);
    });
});

module.exports = router; 