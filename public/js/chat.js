//client side code
var state=document.getElementById('state');
var connected = false;
var username = '';
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var closeChat = document.getElementById('closeChat');
var set=document.getElementById('set');
var key=0;


set.addEventListener('click',function(){ 

	if(document.getElementById('handle').value==''){
		alert('choose a username');
	}else if(document.getElementById('handle').value!='' && key==0){
		username=document.getElementById('handle').value;
		state.innerHTML=username+' we are looking for your partner';
		key=1;
		
		var socket = io('http://localhost:8080');
		socket.on('connect', function (data) { 
			connected = true;
			socket.emit('login', {'name' : username});
			
		});
		socket.on('chat start', function(data) {
			if(data.name=='undefined'){
				location.reload();
			}
			state.innerHTML='<h6>You have been connected to: '+ data.name +'</h6>';
		});
		
		socket.on('sendMessage', function(data){
			feedback.innerHTML = '';
			output.innerHTML += '<p><strong>' + data.name + ': </strong>' + data.message + '</p>';
			updateScroll();
		});
		
		socket.on('typing',function(data){
			feedback.innerHTML = '<h6>'+ data.name +' is typing...</h6>';
			updateScroll();
		});
		
		socket.on('nottyping',function(){
			feedback.innerHTML = '';
		});
		
		socket.on('chat end', function() {
			output.innerHTML ='';
			state.innerHTML='<h6>You are disconnected, looking for new partner... </h6>';
			alert('your partner just left');
		});
		
		btn.addEventListener('click', function(){
			if(message.value!=''){
				$('.emoji-wysiwyg-editor').html('');
				socket.emit('sendMessage', {'name': username,'message': message.value});
				output.innerHTML += '<p><strong>' + username + ': </strong>' + message.value + '</p>';
				
				message.value = '';
				updateScroll();
			}else{
				alert("you have to say something");
			}
		});

		closeChat.addEventListener('click',function() { // call this when user want to end current chat
				state.innerHTML='<h6>click on set username or enter a new username</h6>';
				key=0;
				output.innerHTML='';
				socket.disconnect();
				location.reload();
		});
		
		$('.emoji-wysiwyg-editor').on('focus', function(){
			socket.emit('typing', {'name':username});
		});
		
		$('.emoji-wysiwyg-editor').on('blur', function(){
			socket.emit('nottyping');
		});
	
		function updateScroll(){
			
				var element = document.getElementById("chat-window");
				element.scrollTop = element.scrollHeight;
			
		}

	}else{
		alert('a username has been selected');
	}	
	
});

btn.addEventListener('click', function(){
	if(username=='' || username=='undefined'){
		alert('choose a username');
	}
});

$(function() {
	// Initializes and creates emoji set from sprite sheet
	window.emojiPicker = new EmojiPicker({
	  emojiable_selector: '[data-emojiable=true]',
	  assetsPath: '../lib/img/',
	  popupButtonClasses: 'fa fa-smile-o'
	});
	// Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
	// You may want to delay this step if you have dynamically created input fields that appear later in the loading process
	// It can be called as many times as necessary; previously converted input fields will not be converted again
	window.emojiPicker.discover();
	});


	
	

