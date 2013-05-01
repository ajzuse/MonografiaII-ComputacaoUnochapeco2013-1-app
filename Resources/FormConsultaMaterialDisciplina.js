function FormConsultaMaterialDisciplina(_NomeDisciplina)
{
	this.create = function()
	{
		Ti.API.info(_NomeDisciplina);
		
		var dados = [];
		var formConsultaMaterialDisciplina = Titanium.UI.createWindow({
			top: 0,
			height: pegarAlturaTela(),
			width: pegarLarguraTela(),
			backgroundColor: 'white'
		});
		
		//Carrega as informações da tabela no vetor de dados para inserir no tableView
		var db = Ti.Database.open('MinhaUnoDB')
		var disciplinas = db.execute('SELECT publicacao, nome, descricao, url FROM MaterialApoio where NomeDisciplina = ? ORDER BY Publicacao', _NomeDisciplina);
		while (disciplinas.isValidRow())
		{
			var row = Ti.UI.createTableViewRow({
				height: '70dp',
				id: disciplinas.fieldByName('url'),
			});
			var label = Ti.UI.createLabel({
				text: disciplinas.fieldByName('publicacao'),
				id: disciplinas.fieldByName('publicacao'),
				height:'auto',
				left:'15dp',
				top:'5dp',
				color:'#000',
				touchEnabled:false,
				
				font:
				{
                	fontSize:'12dp',
            		fontWeight:'bold'
            	}
			});
			
			var publicacao = Ti.UI.createLabel({
	        	text: disciplinas.fieldByName('nome'),
	        	id: disciplinas.fieldByName('descricao'),
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
			row.add(publicacao);
			dados.push(row);
			disciplinas.next();
		}
		disciplinas.close();
		db.close();
		
		// create table view
		var tvDisciplinasApoio = Titanium.UI.createTableView({
			top: 0,
			height: calcularProporcaoAlturaTela(75),
			data: dados
		});
		 
		// create table view event listener
		tvDisciplinasApoio.addEventListener('click', function(e)
		{
		    // event data
		   Ti.Platform.openURL(e.rowData.id);
		    
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
			formConsultaMaterialDisciplina.close();
		});
				
		formConsultaMaterialDisciplina.add(btnVoltar);
		formConsultaMaterialDisciplina.add(tvDisciplinasApoio);
		formConsultaMaterialDisciplina.open();
	};
};
