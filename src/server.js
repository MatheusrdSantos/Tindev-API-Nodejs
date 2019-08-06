const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const server = express();

mongoose.connect('mongodb+srv://user1:user1@tindev-a6ocv.mongodb.net/Tindev?retryWrites=true&w=majority', {useNewUrlParser: true});
server.use(express.json())
server.use(routes);
server.listen(3333);