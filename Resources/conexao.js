
var ConexaoServidor = function(_Usuario, _Senha)
{
	var urlBase = "http://minhaunomovel.no-ip.org:90?usuario=" + _Usuario + "&senha=" + _Senha;	
	//var urlBase = "http://192.168.1.200:90?usuario=" + _Usuario + "&senha=" + _Senha;	
	var database, databaseName = 'MinhaUnoDB';
		
 	var validarLogin = function(_EventoLoginValido)
 	{
 		var client = Ti.Network.createHTTPClient({
     	// function called when the response data is available
    	onload : function(e) {
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
		database = Ti.Database.open(databaseName);
		
		/*
		 * Código de Emergencia... Use com sabedoria!
		 */
		/*
		database.execute('DROP TABLE HorarioSemestre;');
		database.execute('DROP TABLE HorarioSemestreDisciplina;');
		database.execute('DROP TABLE NotaGraduacao;');
		database.execute('DROP TABLE NotaGraduacaoAvaliacao;');
		database.execute('DROP TABLE MaterialApoio;');
		*/
		
		//Criação das tabelas feitas desta forma pois não funcionou a passagem de variáveis com o SQL para a função execute.
		database.execute('CREATE TABLE IF NOT EXISTS HorarioSemestre(codigo TEXT, turma TEXT, nome TEXT, curso TEXT, dataG2 TEXT, dataG3 TEXT, professor TEXT, creditos INTEGER, turno TEXT, grade INTEGER, periodo INTEGER);');
		database.execute('CREATE TABLE IF NOT EXISTS HorarioSemestreDisciplina(codigo TEXT, turma TEXT, hora TEXT, diasemana TEXT, data TEXT, ocorreu TEXT);');
		database.execute('CREATE TABLE IF NOT EXISTS NotaGraduacao(nome TEXT, notaG3 FLOAT, mediaFinal FLOAT, notaG2 FLOAT, notaG1 FLOAT, estadoMateria TEXT, statusAcademico TEXT);');
		database.execute('CREATE TABLE IF NOT EXISTS NotaGraduacaoAvaliacao(nomeDisciplina TEXT, peso TEXT, nota FLOAT, data TEXT, nome TEXT);');
		database.execute('CREATE TABLE IF NOT EXISTS MaterialApoio(nomeDisciplina TEXT, publicacao TEXT, nome TEXT, descricao TEXT, url TEXT);');
		
		database.close();
 	}
 	
 	var extrairMaterialApoio = function(_url, _proximaFuncao)
 	{
 		var client = Ti.Network.createHTTPClient({
     	// function called when the response data is available
    	onload : function(e) {
     		var json = JSON.parse(this.responseText);
			var i, j, disciplina, detalhes;
			
			database = Ti.Database.open(databaseName);
			database.execute('delete from MaterialApoio;');
			
			for (i = 0; i < json.disciplinas.length; i++) {
				disciplina = json.disciplinas[i];

				for(j = 0; j < disciplina.materiais.length; j++){
					detalhe = disciplina.materiais[j];
					database.execute('insert into MaterialApoio (nomeDisciplina, publicacao, nome, descricao, url) values (?,?,?,?,?);', disciplina.nome, detalhe.publicacao, detalhe.nome, detalhe.descricao, detalhe.url);
				}
			}
			
			database.close();
			
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
    		var json = JSON.parse(this.responseText);
			var i, j, disciplina, detalhes;
			
			database = Ti.Database.open(databaseName);
			database.execute('delete from NotaGraduacao;');
			database.execute('delete from NotaGraduacaoAvaliacao');
			
			for (i = 0; i < json.disciplinas.length; i++) {
				disciplina = json.disciplinas[i];

				if(disciplina.dados.estado == 'fechada')
				{
					database.execute('insert into NotaGraduacao (nome, notaG3, mediaFinal, notaG2, notaG1, estadoMateria, statusAcademico) values (?,?,?,?,?,?,?);', disciplina.nome, disciplina.dados.G3, disciplina.dados.MF, disciplina.dados.G2, disciplina.dados.G1, disciplina.dados.estado, disciplina.dados.status);
				}
				else
				{
					database.execute('insert into NotaGraduacao (nome, notaG3, mediaFinal, notaG2, notaG1, estadoMateria, statusAcademico) values (?,?,?,?,?,?,?);', disciplina.nome, 0, 0, disciplina.dados.mediaG2, disciplina.dados.mediaG1, disciplina.dados.estado, "");
					
					for (j = 0; j < disciplina.dados.avaliacoes.length; j++)
					{
						database.execute('insert into NotaGraduacaoAvaliacao (nomeDisciplina, peso, nota, data, nome) values (?,?,?,?,?);', disciplina.nome, disciplina.dados.avaliacoes[j].peso, disciplina.dados.avaliacoes[j].nota, disciplina.dados.avaliacoes[j].data, disciplina.dados.avaliacoes[j].nome);
					}
				}
				
			}
			
			database.close();
    		
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
			var json = JSON.parse(this.responseText);
     		var i, j, disciplina, detalhes;
			
			database = Ti.Database.open(databaseName);
			database.execute('delete from HorarioSemestre;');
			database.execute('delete from HorarioSemestreDisciplina');
			
			for (i = 0; i < json.disciplinas.length; i++) {
				disciplina = json.disciplinas[i];


				database.execute('insert into HorarioSemestre(codigo, turma, nome, curso, dataG2, dataG3, professor, creditos, turno, grade, periodo) values (?,?,?,?,?,?,?,?,?,?,?);', disciplina.codigo, disciplina.turma, disciplina.nome, disciplina.dados.detalhes.curso, disciplina.dados.detalhes.g2, disciplina.dados.detalhes.g3, disciplina.dados.detalhes.professor, disciplina.dados.detalhes.creditos, disciplina.dados.detalhes.turno, disciplina.dados.detalhes.grade, disciplina.dados.detalhes.periodo);
				
				for(j = 0; j < disciplina.dados.horarios.length; j++)
				{
					var horario = disciplina.dados.horarios[j];
					
					database.execute('insert into HorarioSemestreDisciplina(codigo, turma, hora, diasemana, data, ocorreu) values (?,?,?,?,?,?);', disciplina.codigo, disciplina.turma, horario.hora, horario.semana, horario.dia, horario.ocorreu);
				}
				
			}
			
			database.close();

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
 			extrairMaterialApoio(urlMaterialApoio, extrairHorariosSemestre(urlHorariosSemestre, extrairNotasGraduacao(urlNotasGraduacao, _EventoFimExtracao)));
 		});
 	}
 	

};

