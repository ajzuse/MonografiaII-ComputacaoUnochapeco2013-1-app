Ti.include('Funcoes.js');

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
	var btnLogin;

	var loginValido;
	
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
		
		imgUnochapeco = Ti.UI.createImageView({
			image:'LogoUno.png',
	    	height: AlturaImagem,
	    	width: LarguraImagem,
	    	top: calcularProporcaoAlturaTela(5),
	    	left: DistanciaBorda
		});
		
		lblUsuario = Ti.UI.createLabel
		({
			text: 'Usuário',
		    textAlign:'center',
		    top: imgUnochapeco.top + AlturaImagem + calcularProporcaoAlturaTela(2),
		  	height: AlturaLabel,
		    width:  LarguraLabel,
		    left:   DistanciaBorda
		});
		
		edtUsuario = Ti.UI.createTextField
		({
		  	top: lblUsuario.top + AlturaLabel,
		    height: AlturaEdit,
		    width: LarguraEdit,
		    left: DistanciaBorda,
		    enableReturnKey:false,
		   	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		   	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
		});
		
		lblSenha = Ti.UI.createLabel
		({
			text: 'Senha',
		    textAlign:'center',
		    top: edtUsuario.top + AlturaEdit + calcularProporcaoAlturaTela(1),
		    height: AlturaLabel,
		    width: LarguraLabel,
		    left: DistanciaBorda
		});
		
		edtSenha = Ti.UI.createTextField
		({
			width: LarguraEdit,
		  	height: AlturaEdit,
		  	top: lblSenha.top + AlturaLabel,
		    left: DistanciaBorda,
		    passwordMask:true,
		    enableReturnKey:false,
		   	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		   	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
		});
		
		//Botoes
		btnLogin = Ti.UI.createButton
		({
			width: LarguraEdit,
			height: AlturaEdit,
			top: edtSenha.top + AlturaEdit + calcularProporcaoAlturaTela(10),
		    left: DistanciaBorda,
		    title: 'Login'
		});
		
		btnLogin.addEventListener('click', function(e){
			var url = "http://192.168.1.9:90?usuario=" + edtUsuario.getValue() + "&senha=" + edtSenha.getValue();			
 			var client = Ti.Network.createHTTPClient({
     			// function called when the response data is available
     			onload : function(e) {
         			Ti.API.info("Received text: " + this.responseText);					         			
     			},
    		 	// function called when an error occurs, including a timeout
     			onerror : function(e) {
     				msgBox('Atenção', 'Ocorreu um problema na comunicação com o servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.');
         			Ti.API.debug(e.error);
    	    	},
     			timeout : 5000  // in milliseconds
 			});
 			// Prepare the connection.
	 		client.open("GET", url);
 			// Send the request.
 			client.send();  
 					

		});
		
		scroll.add(imgUnochapeco);
		scroll.add(lblUsuario);
		scroll.add(edtUsuario);
		scroll.add(lblSenha);
		scroll.add(edtSenha);
		scroll.add(btnLogin);
		form.add(scroll);
		form.open();
	};
		
}
