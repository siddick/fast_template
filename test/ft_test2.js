/* Testing the Class Methods and Class Method Inherit in the Child Class */

var LoginForm = FT.Component.Form.create({
	fields: {
		name: FT.Component.InputBox, 
		password: FT.Component.InputBox,
		login: FT.Component.InputBox.create({
			getFunctionCall: function(){},
			events: {
				click: function( obj ){
					alert(obj.getParent().getValue().toJSON());
				}
			}
		})
	}
});

Event.observe( window, 'load', function(){
	var login_form = new LoginForm( $('login_form') );
	login_form.setValue( { name: 'siddick', password: 'password' } );
});
