const express = require('express'); // import express package
const app = express(); // create http application
const path = require('path');
const mongoose = require('mongoose');
// find the MongoDB URI from the deployment we just created in mLab
mongoose.connect('mongodb://cs1805user:cs1805pw@ds129823.mlab.com:29823/1805');

const restRouter = require('./routes/rest'); // import rest router
const indexRouter = require('./routes/index')
// if the url mathces '/api/v1', it will use restRouter to handle the traffic
app.use('/api/v1', restRouter);
app.use(express.static(path.join(__dirname, '../public')));
// launch application, listen on port 3000
app.listen(3000, () => {
   console.log('App is listening to port 3000!');
});