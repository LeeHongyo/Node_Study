import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

console.log("hello");
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log('Listening on http://localhost:8080');
//app.listen(8080, handleListen);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) =>{
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("Disconnected to Server ❌")); 
    socket.send("hello!!!");
});


server.listen(8080, handleListen);