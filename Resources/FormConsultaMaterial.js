Ti.include('Funcoes.js');

var dados = [];

//Carrega as informações da tabela no vetor de dados para inserir no tableView
var db = Ti.Database.open('MinhaUnoDB')
var disciplinas = db.execute('SELECT distinct NomeDisciplina FROM MaterialApoio ORDER BY NomeDisciplina');
while (disciplinas.isValidRow())
{
	var row = Ti.UI.createTableViewRow({
		height: '60dp'
	});
	var label = Ti.UI.createLabel({
		text: disciplinas.fieldByName('NomeDisciplina'),
		height:'auto',
		left:'10dp',
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
	height: 'auto',
	data: dados,
});
 
// create table view event listener
tvDisciplinasApoio.addEventListener('click', function(e)
{
    // event data
   Ti.API.info(e.index);
    
});

Ti.UI.currentWindow.add(tvDisciplinasApoio);