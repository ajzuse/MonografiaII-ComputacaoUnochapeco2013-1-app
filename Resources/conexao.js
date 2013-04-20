
var ConexaoServidor = function(_Usuario, _Senha)
{
	var url = "http://192.168.1.9:90?usuario=" + edtUsuario.getValue() + "&senha=" + edtSenha.getValue();			
 	var client = Ti.Network.createHTTPClient({
     	// function called when the response data is available
    	onload : function(e) {
     		Ti.API.info("Received text: " + this.responseText);					         			
    	},
    	// function called when an error occurs, including a timeout
     	onerror : function(e) {
     		msgBox('Atenção', 'Ocorreu um problema na comunicação com o servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.');
         	Ti.API.debug(e.error);
    	},
     	timeout : 5000  // in milliseconds
 	});
 	
 	// Prepare the connection.
	client.open("GET", url);
 	// Send the request.
 	client.send();  
};

