const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Routes to serve each HTML file
app.get("/indeed", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "indeed.html"));
});

app.get("/feature", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "feature.html"));
});

app.get("/main", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "main.html"));
});

app.get("/privacy", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "privacy.html"));
});

app.get("/working", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "working.html"));
});

// Route for register.html in the "login" folder
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login", "register.html"));
});

io.on("connection", function(socket){
    socket.on("newuser",function(username){
        socket.broadcast.emit("update", username + " joined the conversation");
    });
    socket.on("exituser",function(username){
        socket.broadcast.emit("update", username + " left the conversation");
    });
    socket.on("chat",function(message){
        socket.broadcast.emit("chat", message);
    });
});

server.listen(5000, () => {
    console.log("Server is listening on port 5000");
});







// User
// const express = require("express");
// const path = require("path");

// const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

// app.use(express.static(path.join(__dirname+"/public")));

// io.on("connection", function(socket){
//     socket.on("newuser",function(username){
//         socket.broadcast.emit("update",username+"joined the conversation")
//     });
//     socket.on("exituser",function(username){
//         socket.broadcast.emit("update",username+"left the conversation")
//     });
//     socket.on("chat",function(message){
//         socket.broadcast.emit("chat", message)
//     });
// });
// server.listen(5000);






/*const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Serve static files from both 'public' and 'chats' folders
app.use(express.static(path.join(__dirname, "public")));
app.use("/chats", express.static(path.join(__dirname, "chat")));

io.on("connection", function(socket){
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " joined the conversation");
    });
    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " left the conversation");
    });
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });
});

server.listen(5000);*/