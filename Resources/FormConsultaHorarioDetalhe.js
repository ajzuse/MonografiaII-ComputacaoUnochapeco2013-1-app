
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
		var horarios = db.execute('SELECT hora, diasemana, data, ocorreu FROM HorarioSemestreDisciplina where codigo = ? ORDER BY data', _CodigoDisciplina);
		
		if(!horarios.rowCount)
		{
			msgBox('Atenção', 'Não existem horários cadastrados para esta disciplina!');
			horarios.close();
			db.close();
			return;
		}
		
		while (horarios.isValidRow())
		{
			var texto = '';
			
			texto += 'Data: ' + horarios.fieldByName('data') + '\n';
			texto += 'Hora: ' + horarios.fieldByName('hora') + '\n';
			texto += 'Dia da Semana: ' + horarios.fieldByName('diasemana') + '\n';
			
			Ti.API.info(_CodigoDisciplina);
			Ti.API.info(texto);
			
			var label = Ti.UI.createLabel({
				text: (horarios.fieldByName('ocorreu') == 'true') ? 'Já aconteceu' : 'Não aconteceu',
				height:'auto',
				left:'15dp',
				top:'5dp',
				color:'#000',
				touchEnabled:false,
				
				font:
				{
                	fontSize:'15dp',
            		fontWeight:'bold'
            	}
			});
			
			var detalhes = Ti.UI.createLabel({
	        	text: texto,
		        font:{
		            fontSize:'auto'
		        },
		        height:'auto',
		        left:'15dp',
		        bottom:'5dp',
		        color:'#000',
		        touchEnabled:false
	        });
			
			row.add(label);
			row.add(detalhes);
			dados.push(row);
			horarios.next();
		}
		horarios.close();
		db.close();
		
		// create table view
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
				
		formConsultaHorarioDetalhe.add(btnVoltar);
		formConsultaHorarioDetalhe.add(tvHorarios);
		formConsultaHorarioDetalhe.open();
	};
}
