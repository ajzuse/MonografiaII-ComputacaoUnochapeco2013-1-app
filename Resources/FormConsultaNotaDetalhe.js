function FormConsultaNotaDetalhe()
{
	this.create = function(_NomeDisciplina)
	{
		Ti.API.info(_NomeDisciplina);
		
		var dados = [];
		var formConsultaNotaDetalhe = Titanium.UI.createWindow({
			top: 0,
			height: pegarAlturaTela(),
			width: pegarLarguraTela(),
			backgroundColor: 'white'
		});
		
/*
 *  CREATE TABLE IF NOT EXISTS NotaGraduacaoAvaliacao(nomeDisciplina TEXT, 
 * 	                                                  peso TEXT, 
 *                                                    nota FLOAT, 
 *                                                    data TEXT, 
 *                                                    nome TEXT);
 */
		//Carrega as informações da tabela no vetor de dados para inserir no tableView
		var db = Ti.Database.open('MinhaUnoDB')
		var avaliacoes = db.execute('SELECT nome, peso, nota, data FROM NotaGraduacaoAvaliacao where NomeDisciplina = ? ORDER BY data', _NomeDisciplina);
		
		if(!avaliacoes.rowCount)
		{
			msgBox('Atenção', 'Não existem avaliações cadastradas!');
			avaliacoes.close();
			db.close();
			return;
		}
		
		while (avaliacoes.isValidRow())
		{
			var texto;
			if(avaliacoes.fieldByName('nota') != ""){
				texto =  'Nota: ' + avaliacoes.fieldByName('nota') + '\n' + 'Peso: ' + avaliacoes.fieldByName('peso') + '\n' + 'Data: ' + avaliacoes.fieldByName('data') ;
			}
			else{
				texto = 'Peso: ' + avaliacoes.fieldByName('peso') + '\n' + 'Data: ' + avaliacoes.fieldByName('data') ;
			}
			var row = Ti.UI.createTableViewRow({
				height: '90dp',
			});
			var label = Ti.UI.createLabel({
				text: avaliacoes.fieldByName('nome'),
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
			avaliacoes.next();
		}
		avaliacoes.close();
		db.close();
		
		// create table view
		var tvAvaliacoes = Titanium.UI.createTableView({
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
			formConsultaNotaDetalhe.close();
		});
				
		formConsultaNotaDetalhe.add(btnVoltar);
		formConsultaNotaDetalhe.add(tvAvaliacoes);
		formConsultaNotaDetalhe.open();
	};
}
