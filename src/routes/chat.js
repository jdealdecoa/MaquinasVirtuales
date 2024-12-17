const {Router} = require("express");
const router = Router();

router.get("/", (req,res) => {

    res.sendFile(__dirname + "/chat.html");

});

const io = app.get("io");

var rooms = [
    { 
        name : "Sala de pruebas 1", 
        usersCount : 5,
        message: ["Hola", "Adios"]
    },
    { 
        name : "Sala de pruebas 2", 
        usersCount : 7,
        message: ["Hola2", "Adios2"]
    }
];

var messages = [];


io.on("connection", (socket) => {

    var adress = socket.request.connection;
    console.log ("socket Connected with IP:Port -->"
        + adress.remoteAdress + ":" + adress.remotePort);

    //ROOM SELECTOR

    socket.on("GetInitialRooms", ()=>{
        socket.emit("ÍnitialRooms", rooms);
    });

    socket.on("EnterRoomClientToServer", (roomName) => {
        for(room of rooms)
        {
            if(room.name === roomName)
            {
                room.usersCount +=1;     
                socket.emit("EnterRoomServerToClient", room);
                io.emit("RoomsUpdate", room);
                break;
            }
        }
    });

    //CHAT CODE



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