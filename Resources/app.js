// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.include('FormLogin.js');

Titanium.UI.setBackgroundColor('#000');

var login = new FormLogin();
login.create();
