
function FormConsultaHorarioDetalhe(_CodigoDisciplina)
{
	this.create = function()
	{		
		var dados = [];	
	
		var formConsultaHorarioDetalhe = Titanium.UI.createWindow({
			top: 0,
			height: pegarAlturaTela(),
			width: pegarLarguraTela(),
			backgroundColor: 'white'
		});

		//Carrega as informações da tabela no vetor de dados para inserir no tableView
		var db = Ti.Database.open('MinhaUnoDB')
		var horarios = db.execute('SELECT hora, diasemana, data, ocorreu FROM HorarioSemestreDisciplina where codigo = ?', _CodigoDisciplina);
				
		if(!horarios.rowCount)
		{
			msgBox('Atenção', 'Não existem horários cadastrados para esta disciplina!');
			horarios.close();
			db.close();
			return;
		}
		
		while(horarios.isValidRow())
		{
			if(horarios.fieldByName('data') != '' && horarios.fieldByName('hora') != '' && horarios.fieldByName('diasemana') != '')
			{
				var texto = 'Data: ' + horarios.fieldByName('data') + ' - ' + 'Hora: ' + horarios.fieldByName('hora') + '\n' + 'Dia da Semana: ' + horarios.fieldByName('diasemana') + '\n';
				var estilo = (horarios.fieldByName('ocorreu') == 'false') ? 'bold' : 'normal' ;
				var registro = Ti.UI.createTableViewRow({
					height: '60dp'
				});
				
				var descricao = Ti.UI.createLabel({
					text: texto,
					font:
					{
						fontWeight: estilo
					}
				});
				
				registro.add(descricao);
				dados.push(registro);
			}
			horarios.next();
		}
		
		var tvHorarios = Titanium.UI.createTableView({
			top: 0,
			height: calcularProporcaoAlturaTela(75),
			data: dados
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
			formConsultaHorarioDetalhe.close();
		});
	
		formConsultaHorarioDetalhe.add(tvHorarios);
		formConsultaHorarioDetalhe.add(btnVoltar);
		formConsultaHorarioDetalhe.open();
	};
}
