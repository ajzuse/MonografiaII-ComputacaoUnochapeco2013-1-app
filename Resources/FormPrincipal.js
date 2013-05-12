Ti.include('Funcoes.js');
Ti.include('conexao.js');
Ti.include('FormLogin.js');

var Opcoes = [{title: 'Material de Apoio'}, 
              {title: 'Notas da Graduação'}, 
              {title: 'Horários do Semestre'},
              {title: ''},
              {title: 'Sobre'},
              {title: 'Atualizar'},
              {title: 'Sair'}
];

var AlturaImagem       = calcularProporcaoAlturaTela(20);
var LarguraImagem;     
var DistanciaBorda;     
var AlturaGrid         = calcularProporcaoAlturaTela(79)

if(Ti.Platform.model.indexOf('iPad') !== -1)
{
	LarguraImagem  = calcularProporcaoLarguraTela(60);
	DistanciaBorda = calcularProporcaoLarguraTela(20);
}
else
{
	LarguraImagem  = calcularProporcaoLarguraTela(80);
	DistanciaBorda = calcularProporcaoLarguraTela(10);
}

var imgUnochapeco = Ti.UI.createImageView
({
	image:'LogoUno.png',
    height: AlturaImagem,
    width: LarguraImagem,
    top: calcularProporcaoAlturaTela(0),
    left: DistanciaBorda
});

// create table view
var tableview = Titanium.UI.createTableView({
	top: calcularProporcaoAlturaTela(20),
	height: AlturaGrid,
    data:Opcoes,
});
 
// create table view event listener
tableview.addEventListener('click', function(e)
{
    // event data
    var index = e.index;
    
    /*if(index == 0)
   	{	
		Ti.include('FormConsultaMaterial.js');
   	}
   	else if(index == 1)
   	{	
		Ti.include('FormConsultaNota.js');
   	}
   	else if(index == 2)
   	{
   		Ti.include('FormConsultaHorarioSemestre.js');	
   	}
	else if(index == 4)
	{
		msgBox('Sobre', 'Trabalho de conclusão do curso de Ciência da Computação 2013/1. \n\nAcadêmico: Andrei Jiácomo Zuse \nOrientador: Marcelo Cezar Pinto');
	}*/
	switch(index)
	{
		case 0:
			Ti.include('FormConsultaMaterial.js');
			break;
		case 1:
			Ti.include('FormConsultaNota.js');
			break;
		case 2:
   			Ti.include('FormConsultaHorarioSemestre.js');	
			break;
		case 4:
			msgBox('Sobre', 'Trabalho de conclusão do curso de Ciência da Computação 2013/1. \n\nAcadêmico: Andrei Jiácomo Zuse \nOrientador: Marcelo Cezar Pinto');
			break;
		case 5:
			var db = Ti.Database.open('MinhaUnoDB')
			var configuracoes = db.execute('select login, senha from configuracao;');
			var usuario = configuracoes.fieldByName('login');
			var senha = configuracoes.fieldByName('senha');
			configuracoes.close();
			db.close();
			Ti.API.info(usuario);
			Ti.API.info(senha);
			var Conexao = new ConexaoServidor(usuario, senha);
			Conexao.extrairInformacoes(alert('Terminou'));
			break;
		case 6:
			var db = Ti.Database.open('MinhaUnoDB')
			var configuracoes = db.execute('delete from configuracao;');
			db.close();
			var login = new FormLogin();
			login.create();
			break;
	}
	
});

Ti.UI.currentWindow.add(imgUnochapeco);
Ti.UI.currentWindow.add(tableview)
