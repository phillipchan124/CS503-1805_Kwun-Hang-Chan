const express = require('express'); 
const app = express(); // create http application
const path = require('path');

var http = require('http');
var socketIO = require('socket.io');
var io = socketIO();
// require('./services/editorSocketService')(io) is function call
var editorSocketService = require('./services/editorSocketService')(io);

const mongoose = require('mongoose');
mongoose.connect('mongodb://cs1805user:cs1805pw@ds129823.mlab.com:29823/1805');

const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');

// // response for GET request when url matches '/'
// // send 'Hello world from express' to client no matter what the request is
// app.get('/', (req, res) => {
//    res.send('Hello world from express');
// });

// if the url mathces '/api/v1', it will use restRouter to handle the traffic
app.use('/api/v1', restRouter);
app.use(express.static(path.join(__dirname, '../public')));

// launch application, listen on port 3000
// app.listen(3000, () => {
//    console.log('App is listening to port 3000!');
// });

// connect io with server
const server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('listening', () => {
    console.log('App is listening to port 3000!')
});

app.use((req, res) => {
	res.sendFile('index.html', {root: path.join(__dirname, '../public')});
})