Ti.include('Funcoes.js');
Ti.include('FormConsultaHorarioDetalhe.js');

var dados = [];
var formHorariosSemestre = Titanium.UI.createWindow({
	top: 0,
	height: pegarAlturaTela(),
	width: pegarLarguraTela(),
	backgroundColor: 'white'
});

//Carrega as informações da tabela no vetor de dados para inserir no tableView
var db = Ti.Database.open('MinhaUnoDB')
var disciplinas = db.execute('SELECT distinct Nome, Codigo FROM HorarioSemestre ORDER BY Nome');
while (disciplinas.isValidRow())
{
	var row = Ti.UI.createTableViewRow({
		height: '60dp',
		id: disciplinas.fieldByName('codigo'),
	});
	var label = Ti.UI.createLabel({
		text: disciplinas.fieldByName('Nome'),
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
var tvHorariosSemestre = Titanium.UI.createTableView({
	top: 0,
	height: calcularProporcaoAlturaTela(75),
	data: dados
});
 
// create table view event listener
tvHorariosSemestre.addEventListener('click', function(e)
{
	var db = Ti.Database.open('MinhaUnoDB')
	var detalheDisciplina = db.execute('select nome, turma, curso, dataG2, dataG3, professor, creditos, turno, grade, periodo from HorarioSemestre where codigo = ?', e.rowData.id);
	var conteudo, listaBotoes;
	
	var msgTurma = (detalheDisciplina.fieldByName('turma') != null) ? 'Turma: ' + detalheDisciplina.fieldByName('turma') + '\n' : '';
	var msgCurso = (detalheDisciplina.fieldByName('curso') != null) ? 'Curso: ' + detalheDisciplina.fieldByName('curso') + '\n' : '';
	var msgDataG2 = (detalheDisciplina.fieldByName('dataG2') != null) ? 'Data da G2: ' + detalheDisciplina.fieldByName('dataG2') + '\n' : '';
	var msgDataG3 = (detalheDisciplina.fieldByName('dataG3') != null) ? 'Data da G3: ' + detalheDisciplina.fieldByName('dataG3') + '\n' : '';
	var msgProfessor = (detalheDisciplina.fieldByName('professor') != null) ?  'Professor: ' + detalheDisciplina.fieldByName('professor') + '\n' : '';
	var msgTurno = (detalheDisciplina.fieldByName('turno') != null) ? 'Turno: ' + detalheDisciplina.fieldByName('turno') + '\n' : '';
	var msgGrade = (detalheDisciplina.fieldByName('grade') != null) ? 'Grade: ' + detalheDisciplina.fieldByName('grade') + '\n' : '';
	var msgPeriodo = (detalheDisciplina.fieldByName('periodo') != null) ? 'Período: ' + detalheDisciplina.fieldByName('periodo') + '\n' : '';
	
	conteudo = msgTurma + msgCurso + msgGrade + msgTurno + msgProfessor + msgDataG2 + msgDataG3;
	
	listaBotoes = ['Fechar', 'Detalhes'];

	
 	var Msg = Ti.UI.createAlertDialog
	({
	   title: detalheDisciplina.fieldByName('nome'),
	   message: conteudo,
	   buttonNames: listaBotoes
	});
	
	Msg.addEventListener('click', function(click){
		if(click.index == 1)
		{
			var detalhes = new FormConsultaHorarioDetalhe(e.rowData.id);
			detalhes.create();
		}
	});
	
	Msg.show();
	detalheDisciplina.close();
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
	formHorariosSemestre.close();
});
		
formHorariosSemestre.add(btnVoltar);
formHorariosSemestre.add(tvHorariosSemestre);
formHorariosSemestre.open();