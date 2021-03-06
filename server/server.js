const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const{generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
	console.log('new user connected');
	
	// EMITE MENSAGEM PARA AQUELE QUE ACABOU DE CONECTAR
	socket.emit('newMessage', generateMessage('Admin', 'Bem vindo ao chat!'));
	
	// EMITE MENSAGEM PARA TODOS, EXCETO O QUE ACABOU DE ENTRAR
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'Novo usuário entrou no chat'));
	
	// LISTENER DE ENVIO DE NOVA MENSAGEM
	socket.on('createMessage',(message, callback)=>{
		// EMITE EMITE PARA TODOS
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('this is from the server.');
	});
	
	socket.on('disconnect',()=>{
		console.log('user was disconnected from server')
	});
});

server.listen(port, ()=>{
	console.log('server is up on '+ port)
});
