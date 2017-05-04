var socket = io();
socket.on('connect',function(){
	console.log('connected to server');
	
	//
	// cliente envia mensagem ao servidor para ser distribuida no chat
	//
	socket.emit('createMessage',{
		from:'cicrano',
		text:'cole rei'
	});
	//
	//
	
});
socket.on('disconnect',function(){
	console.log('disconnected from server');
});

//
// cliente recebe mensagem do servidor
//
socket.on('newMessage',function(msg){
	console.log('new message', msg);
});
//
//

function envia(){
	
};