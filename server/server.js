const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
	console.log('new user connected');
	
	
	
	//
	// servidor envia mensagem aos clientes
	//
	socket.emit('newMessage',{
		from: 'fulano',
		text: 'oii, tudo bem?',
		createdAt: '2017/06/21 20:30',
	});
	//
	
	//
	// servidor recebe mensagem de um cliente a ser distribuido
	//
	socket.on('createMessage',(msg)=>{
		console.log('createMessage', msg);
		//
		// servidor envia mensagem aos clientes
		//
		/*socket.emit('newMessage',{
			from: msg->from,
			text: msg->text,
			createdAt: 12121,
		});*/
		//
		//
		console.log('createMessage',msg);
		
	});
	//
	//
	
	
	
	
	
	
	socket.on('disconnect',()=>{
		console.log('user was disconnected from server')
	});
});

server.listen(port, ()=>{
	console.log('server is up on '+ port)
})