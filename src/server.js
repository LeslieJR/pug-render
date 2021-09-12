const express = require('express');
const path = require('path')
const server = express();
const routes = require('./routes')
const session = require('express-session');

//Settings
server.set('port', 4040);
//para utilizar el motor de plantillas:
server.set('views', path.join(__dirname, 'views'));
server.set('View engine', 'pug');
server.use(session({
    name: 'users',
    secret: 'users-activity',
    resave: false,
    saveUninitialized: false,
  }))


//Middleware
server.use(express.json()); 
server.use(express.urlencoded({ extended: false })); // activa recibir datos por formulario


//Static folder
server.use(express.static(path.join(__dirname, 'public')))


server.use('/pages', routes.pages)
server.use('/api', routes.api)

module.exports = server;