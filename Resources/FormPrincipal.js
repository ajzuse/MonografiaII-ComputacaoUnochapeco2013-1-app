function FormPrincipal()
{
	var form, scroll;
	
   	this.create = function()
   	{
    	form = Titanium.UI.createWindow({  
    		title:'Menu Principal',
    		backgroundColor:'#fff'
		}); 
		
		scroll = Ti.UI.createScrollView({
			contentWidth:'auto', 
			contentHeight:'auto', 
			top: 0, 
			showVerticalScrollIndicator: true
		});
		
		scroll.add(MenuItemView('', 'Notas da Graduação', function(){ alert('Clicou nas Notas') }));
		scroll.add(MenuItemView('', 'Material de Apoio', function(){ alert('Clicou nos Materiais') }));
		scroll.add(MenuItemView('', 'Horários do Semestre', function(){ alert('Clicou nos Horarios') }));
		scroll.add(MenuItemView('', 'Sobre', function(){ alert('Clicou no Sobre') }));
		
		form.add(scroll);
		form.show();
   	}
}