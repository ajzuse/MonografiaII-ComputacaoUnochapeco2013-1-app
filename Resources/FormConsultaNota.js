Ti.include('Funcoes.js');

var dados = [];

var formConsultaNotas = Titanium.UI.createWindow({
	top: 0,
	height: pegarAlturaTela(),
	width: pegarLarguraTela(),
	backgroundColor: 'white'
});

//Carrega as informações da tabela no vetor de dados para inserir no tableView
var db = Ti.Database.open('MinhaUnoDB')
var disciplinas = db.execute('SELECT distinct Nome FROM NotaGraduacao ORDER BY Nome');
while (disciplinas.isValidRow())
{
	var row = Ti.UI.createTableViewRow({
		height: '60dp',
		id: disciplinas.fieldByName('Nome'),
	});
	var label = Ti.UI.createLabel({
		text: disciplinas.fieldByName('Nome'),
		id: disciplinas.fieldByName('Nome'),
		height:'auto',
		left:'10dp',
		right: '10dp',
		top:'5dp',
		color:'#000',
		touchEnabled:false
	});
	
	row.add(label)
	dados.push(row);
	disciplinas.next();
}
disciplinas.close();
db.close();

// create table view
var tvDisciplinasApoio = Titanium.UI.createTableView({
	top: 0,
	height: calcularProporcaoAlturaTela(75),
	data: dados,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED

});
 
// create table view event listener
tvDisciplinasApoio.addEventListener('click', function(e)
{
/*
 * SQL de criação da tabela:
 *  CREATE TABLE IF NOT EXISTS NotaGraduacao(nome TEXT, 
 * 	                                         notaG3 FLOAT, 
 * 	                                         mediaFinal FLOAT, 
 *                                           notaG2 FLOAT, 
 *                                           notaG1 FLOAT, 
 *                                           estadoMateria TEXT, 
 *                                           statusAcademico TEXT);
 *  CREATE TABLE IF NOT EXISTS NotaGraduacaoAvaliacao(nomeDisciplina TEXT, 
 * 	                                                  peso TEXT, 
 *                                                    nota FLOAT, 
 *                                                    data TEXT, 
 *                                                    nome TEXT);
 */
	var db = Ti.Database.open('MinhaUnoDB')
	var detalheNotas = db.execute('select nome, notaG3, mediaFinal, notaG2, notaG1, estadoMateria, statusAcademico from notagraduacao where nome = ?', e.rowData.id);
	var conteudo, listaBotoes;
	
	if(detalheNotas.fieldByName('estadoMateria') == 'fechada')
	{
		var msgG1 = 'Média de G1: ' + detalheNotas.fieldByName('notaG1') + '\n';
		var msgG2 = 'Média de G1: ' + detalheNotas.fieldByName('notaG2') + '\n';
		var msgMediaFinal = 'Média Final: ' + detalheNotas.fieldByName('mediaFinal') + '\n';
		var statusAcademico = 'Status: ' + detalheNotas.fieldByName('statusAcademico') + '\n';
		
		if(detalheNotas.fieldByName('notaG3') != "")
		{
			var msgG3 = 'Nota da G3: ' + detalheNotas.fieldByName('notaG3') + '\n';
			conteudo = statusAcademico + msgG1 + msgG2 + msgG3 + msgMediaFinal;
		}
		else{
			conteudo = statusAcademico + msgG1 + msgG2 + msgMediaFinal;
		}
		
		listaBotoes = ['Fechar']
	}
	else{
		var msgG1 = 'Média de G1: ' + detalheNotas.fieldByName('notaG1') + '\n';
		var msgG2 = 'Média de G1: ' + detalheNotas.fieldByName('notaG2') + '\n';
		
		conteudo = msgG1 + msgG2;
		listaBotoes = ['Fechar', 'Detalhes'];
	}
	
 	var Msg = Ti.UI.createAlertDialog
	({
	   title: e.rowData.id,
	   message: conteudo,
	   buttonNames: listaBotoes
	});
	
	Msg.addEventListener('click', function(click){
		if(click.index == 1)
		{
			
		}
	});
	
	Msg.show();
	detalheNotas.close();
	db.close();
});

var btnVoltar = Ti.UI.createButton
({
	width: calcularProporcaoLarguraTela(80),
	height: calcularProporcaoAlturaTela(10),
	top: calcularProporcaoAlturaTela(80),
    left: calcularProporcaoLarguraTela(10),
    title: 'Voltar'
});

btnVoltar.addEventListener('click', function(e){
	formConsultaNotas.close();
});
		
formConsultaNotas.add(btnVoltar);
formConsultaNotas.add(tvDisciplinasApoio);
formConsultaNotas.open();