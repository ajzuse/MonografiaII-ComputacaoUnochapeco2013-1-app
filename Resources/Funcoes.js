function pegarLarguraTela()
{
	return Ti.Platform.displayCaps.platformWidth;
}

function pegarAlturaTela()
{
	return Ti.Platform.displayCaps.platformHeight;
}

//Retorna a quantidade de pixels da Altura da tela representados pela porcentagem passada como parÃ¢metro
function calcularProporcaoAlturaTela(Porcentagem)
{
	return (pegarAlturaTela() * (Porcentagem / 100));
}

//Retorna a quantidade de pixels da Largura da tela representados pela porcentagem passada como parÃ¢metro
function calcularProporcaoLarguraTela(Porcentagem)
{
	return (pegarLarguraTela() * (Porcentagem / 100));
}

function msgBox(Titulo, Mensagem)
{
	var Msg = Ti.UI.createAlertDialog
	({
	   title: Titulo,
	   message: Mensagem,
	   buttonNames: ['Ok']	
	});
	
	Msg.show();
}