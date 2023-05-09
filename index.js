const app = require('express')()
const http = require('http').createServer(app)
const routes = require('./api/routes');
const cors = require('cors');
const mongoose = require('mongoose');
const { MY_PORT,MANGODB_URL } = require('./config/variable');
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//Mongo DB Connection
async function connectToMongo() {
    mongoose.connect(MANGODB_URL);
    console.log('Connected to MongoDB');
}
connectToMongo();


app.get('/', (req, res) => {
    res.send("Something went Wrong..!!!")
})

//api routes
app.use('/api', routes);
 
//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    userSocket.on("send_message", (data) => {
        userSocket.broadcast.emit("receive_message", data)
    })
})

http.listen(MY_PORT)
//http.listen(process.env.PORT)