Ti.include('Funcoes.js');

var Opcoes = [{title: 'Material de Apoio'}, 
              {title: 'Notas da Graduação'}, 
              {title: 'Horários do Semestre'},
              {title: 'Sobre'}];

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

var scrScroll = Ti.UI.createScrollView
({
	contentWidth:'auto', 
	contentHeight:'auto', 
	top: 0, 
	showVerticalScrollIndicator: true
});

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
    style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});
 
// create table view event listener
tableview.addEventListener('click', function(e)
{
    // event data
    var index = e.index;
    
    if(index == 0)
   {
   		/*
   			Retorna o nome das disciplinas
   		
   		var db = Ti.Database.open('MinhaUnoDB')
   		var cityWeatherRS = db.execute('SELECT distinct NomeDisciplina FROM MaterialApoio ORDER BY NomeDisciplina');
		while (cityWeatherRS.isValidRow())
		{
  			var cityId = cityWeatherRS.fieldByName('NomeDisciplina');
  			Ti.API.info(cityId);
  			cityWeatherRS.next();
		}
		cityWeatherRS.close();*/
		/*
			Consulta que retorna os materiais da disciplina
	
		var db = Ti.Database.open('MinhaUnoDB')
   		var cityWeatherRS = db.execute('SELECT distinct Nome, url FROM MaterialApoio where nomedisciplina = \'1030292 - INFORMÁTICA E SOCIEDADE\'');
		while (cityWeatherRS.isValidRow())
		{
  			var cityId = cityWeatherRS.fieldByName('Nome');
  			var bla = cityWeatherRS.fieldByName('URL');
  			Ti.API.info(cityId + bla);
  			cityWeatherRS.next();
		}
		cityWeatherRS.close();
		*/
		
		var win = Titanium.UI.createWindow({
    			url: 'FormConsultaMaterial.js',
			});
			
			win.open();
   	}
   	
   	
	
	if(index == 3)
	{
		msgBox('Sobre', 'Trabalho de conclusão do curso de Ciência da Computação 2013/1. \n\nAcadêmico: Andrei Jiácomo Zuse \nOrientador: Marcelo Cezar Pinto');
	}
});

scrScroll.add(imgUnochapeco);
scrScroll.add(tableview);
Ti.UI.currentWindow.add(scrScroll);