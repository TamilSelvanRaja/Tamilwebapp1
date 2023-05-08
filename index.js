const app = require('express')()
const http = require('http').createServer(app)
const routes = require('./api/routes');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { MY_PORT,MANGODB_URL } = require('./config/variable');

// Middleware
app.use(cors());

//Mongo DB Connection
async function connectToMongo() {
  const client = await MongoClient.connect(MANGODB_URL, { useNewUrlParser: true });
  console.log('Connected to MongoDB');
  // Do something with the database here...
  client.close();
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