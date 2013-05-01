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
		Ti.include('FormConsultaMaterial.js');
   	}
   	else if(index == 1)
   	{	
		Ti.include('FormConsultaNota.js');
   	}
   	
   	
	
	else if(index == 3)
	{
		msgBox('Sobre', 'Trabalho de conclusão do curso de Ciência da Computação 2013/1. \n\nAcadêmico: Andrei Jiácomo Zuse \nOrientador: Marcelo Cezar Pinto');
	}
});

scrScroll.add(imgUnochapeco);
scrScroll.add(tableview);
Ti.UI.currentWindow.add(scrScroll);