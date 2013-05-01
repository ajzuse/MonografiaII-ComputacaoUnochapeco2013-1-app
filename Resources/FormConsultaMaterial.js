Ti.include('Funcoes.js');
Ti.include('FormConsultaMaterialDisciplina.js');

var dados = [];

var formConsultaMaterial = Titanium.UI.createWindow({
	top: 0,
	height: pegarAlturaTela(),
	width: pegarLarguraTela(),
	backgroundColor: 'white'
});

//Carrega as informações da tabela no vetor de dados para inserir no tableView
var db = Ti.Database.open('MinhaUnoDB')
var disciplinas = db.execute('SELECT distinct NomeDisciplina FROM MaterialApoio ORDER BY NomeDisciplina');
while (disciplinas.isValidRow())
{
	var row = Ti.UI.createTableViewRow({
		height: '80dp',
		id: disciplinas.fieldByName('NomeDisciplina'),
	});
	var label = Ti.UI.createLabel({
		text: disciplinas.fieldByName('NomeDisciplina'),
		id: disciplinas.fieldByName('NomeDisciplina'),
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
    var detalhes = new FormConsultaMaterialDisciplina(e.rowData.id);
	detalhes.create();
    
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
	formConsultaMaterial.close();
});
		
formConsultaMaterial.add(btnVoltar);
formConsultaMaterial.add(tvDisciplinasApoio);
formConsultaMaterial.open();