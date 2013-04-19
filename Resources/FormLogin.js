Ti.include("Funcoes.js");

function FormLogin()
{
	//Variáveis de controle dos tamanhos
	var LarguraEdit        = calcularProporcaoLarguraTela(80);
	var AlturaEdit         = calcularProporcaoAlturaTela(10);
	var LarguraLabel       = calcularProporcaoLarguraTela(80);
	var AlturaLabel        = calcularProporcaoAlturaTela(8);
	var DistanciaBorda     = calcularProporcaoLarguraTela(10);
	var AlturaImagem       = calcularProporcaoAlturaTela(20);
	var LarguraImagem      = calcularProporcaoLarguraTela(80);
	
	//Variáveis Diversas
	var form;                //Formulário Base
	var edtLogin, edtSenha;  //Edits de Usuário e Senha
	var lblLogin, lblSenha;  //Label de Usuario e Senha
	var scroll;
	var imgUnochapeco;
	
	this.create = function()
	{
		form = Titanium.UI.createWindow({  
    		title:'Login',
    		backgroundColor:'#fff'
		});
		
		scroll = Ti.UI.createScrollView({
			contentWidth:'auto', 
			contentHeight:'auto', 
			top: 0, 
			showVerticalScrollIndicator: true
		});
		
		var imgUnochapeco = Ti.UI.createImageView({
			image:'UNO21.jpg',
	    	height: AlturaImagem,
	    	width: LarguraImagem,
	    	top: calcularProporcaoAlturaTela(5),
	    	left: DistanciaBorda
		});
		
		scroll.add(imgUnochapeco);
		form.add(scroll);
		form.open();
	};
