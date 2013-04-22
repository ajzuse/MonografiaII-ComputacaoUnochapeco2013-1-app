
var ConexaoServidor = function(_Usuario, _Senha)
{
	var urlBase = "http://192.168.1.200:90?usuario=" + _Usuario + "&senha=" + _Senha;	
	var database, databaseName = 'MinhaUnoDB';
		
 	var validarLogin = function(_EventoLoginValido)
 	{
 		var client = Ti.Network.createHTTPClient({
     	// function called when the response data is available
    	onload : function(e) {
     		Ti.API.info("Received text: " + this.responseText);	
     		if(this.responseText == '1')
     		   _EventoLoginValido();			         			
    	},
    	// function called when an error occurs, including a timeout
     	onerror : function(e) {
     		msgBox('Atenção', 'Ocorreu um problema na comunicação com o servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.');
         	Ti.API.debug(e.error);
    	},
     	timeout : 50000  // in milliseconds
 		});
 	
 		// Prepare the connection.
		client.open("GET", urlBase);
 		// Send the request.
 		client.send();  
 	}
 	
 	var inicializarDatabase = function()
 	{
 		Ti.API.info("Inicializando Base de Dados"); 		
		database = Ti.Database.open(databaseName);
		
		//Criação das tabelas feitas desta forma pois não funcionou a passagem de variáveis com o SQL para a função execute.
		database.execute('CREATE TABLE IF NOT EXISTS HorarioSemestre(codigo INTEGER PRIMARY KEY, turma TEXT, nome TEXT, curso TEXT, dataG2 TEXT, dataG3 TEXT, professor TEXT, creditos INTEGER, turno TEXT, grade INTEGER, periodo INTEGER);');
		database.execute('CREATE TABLE IF NOT EXISTS HorarioSemestreDisciplina(codigo INTEGER PRIMARY KEY, turma TEXT, hora TEXT, diasemana TEXT, data TEXT, ocorreu TEXT);');
		database.execute('CREATE TABLE IF NOT EXISTS NotaGraduacao(nome TEXT, notaG3 FLOAT, mediaFinal FLOAT, notaG2 FLOAT, notaG1 FLOAT, estadoMateria TEXT, statusAcademico TEXT);');
		database.execute('CREATE TABLE IF NOT EXISTS NotaGraduacaoAcademico(nomeDisciplina TEXT, peso TEXT, nota FLOAT, data TEXT, nome TEXT);');
		database.execute('CREATE TABLE IF NOT EXISTS MaterialApoio(nomeDisciplina TEXT, publicacao TEXT, nome TEXT, descricao TEXT, url TEXT);');
		
		database.close();
		
		Ti.API.info('Chegou ao fim da criacao da base');
 	}
 	
 	var extrairMaterialApoio = function(_url, _proximaFuncao)
 	{
 		var client = Ti.Network.createHTTPClient({
     	// function called when the response data is available
    	onload : function(e) {
     		Ti.API.info("Received text: " + this.responseText);
     		if(_proximaFuncao)	
     			_proximaFuncao();         			
    	},
    	// function called when an error occurs, including a timeout
     	onerror : function(e) {
     		msgBox('Atenção', 'Ocorreu um problema na comunicação com o servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.');
         	Ti.API.debug(e.error);
    	},
     	timeout : 50000  // in milliseconds
 		});
 	
 		// Prepare the connection.
		client.open("GET", _url);
 		// Send the request.
 		client.send();  
 	}
 	
 	var extrairNotasGraduacao = function(_url, _proximaFuncao)
 	{
 		var client = Ti.Network.createHTTPClient({
     	// function called when the response data is available
    	onload : function(e) {
     		Ti.API.info("Received text: " + this.responseText);	
     		if(_proximaFuncao)	
     			_proximaFuncao();  
    	},
    	// function called when an error occurs, including a timeout
     	onerror : function(e) {
     		msgBox('Atenção', 'Ocorreu um problema na comunicação com o servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.');
         	Ti.API.debug(e.error);
    	},
     	timeout : 50000  // in milliseconds
 		});
 	
 		// Prepare the connection.
		client.open("GET", _url);
 		// Send the request.
 		client.send();  
 	}
 	
 	var extrairHorariosSemestre = function(_url, _proximaFuncao)
 	{
 		var client = Ti.Network.createHTTPClient({
     	// function called when the response data is available
    	onload : function(e) {
     		Ti.API.info("Received text: " + this.responseText);	
     		if(_proximaFuncao)	
     			_proximaFuncao();  
    	},
    	// function called when an error occurs, including a timeout
     	onerror : function(e) {
     		msgBox('Atenção', 'Ocorreu um problema na comunicação com o servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.');
         	Ti.API.debug(e.error);
    	},
     	timeout : 50000  // in milliseconds
 		});
 	
 		// Prepare the connection.
		client.open("GET", _url);
 		// Send the request.
 		client.send();  
 	}
 	
 	this.extrairInformacoes = function(_EventoFimExtracao)
 	{
 		var urlMaterialApoio = urlBase + '&info=materiais';
 		var urlNotasGraduacao = urlBase + '&info=notas';
 		var urlHorariosSemestre = urlBase + '&info=horarios';
 		
 		inicializarDatabase();

 		validarLogin(function(){
 			Ti.API.info('Login Accepted! Começou a extracao de dados.');
 			extrairMaterialApoio(urlMaterialApoio, extrairHorariosSemestre(urlHorariosSemestre, extrairNotasGraduacao(urlNotasGraduacao, 0)));
 		});
 	}
 	

};

