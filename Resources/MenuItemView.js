function MenuItemView(imagem, titulo, acao) {
	
	var self = Ti.UI.createView({
		width: '100%',
		height: 80,
		layout: 'horizontal',
		top: 5,
		bottom: 5,
		borderRadius: 40
	});
	
	self.add(Ti.UI.createImageView({
		image: 'images/icons/'+imagem,
		width: 90,
		height: 80,
		left: 25
	}))
	
	self.add(Ti.UI.createLabel({
		text: ' '+titulo,
		color: '#000',
		font:{
			fontSize: 55,
		 	//fontFamily: 'angelina'
		},
		textAlign: 'left',
		width: 'auto',
		left: 15
	}))
	
	self.addEventListener("touchstart", function(){
		self.backgroundColor = '#198854';
	})
	self.addEventListener("touchend", function(){
		self.backgroundColor = 'transparent';
	})
	self.addEventListener("touchcancel", function(){
		self.backgroundColor = 'transparent';
	})
	self.addEventListener("click", function(){
		acao();
	})
	
	return self;
}

module.exports = MenuItemView;