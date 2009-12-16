/* Testing the Class Methods and Class Method Inherit in the Child Class */

var LoginForm = FT.Component.Form.create({
	fields: {
		name: FT.Component.InputBox, 
		password: FT.Component.InputBox,
		isadmin: FT.Component.CheckBox.create({
			trueValue: 'admin',
			falseValue: 'user',
			events: {
				click: function( obj ){
					alert('hai');
				}
			}
		}),
		color: FT.Component.RadioButton.create({
			events: {
				click: function( obj ){
					alert('hai');
				}
			}
		}),
		login: FT.Component.InputBox.create({
			getFunctionCall: function(value){},
			events: {
				click: function( obj ){
					alert(obj.getParent().getValue().toJSON());
				}
			}
		})
	}
});

Event.observe( window, 'load', function(){
	var element = $('login_form');
	var content = element.inspect() + element.innerHTML + '</' + element.tagName.toLowerCase() + '>';
	var newElement = new Element('span');
	newElement.update( content );
	//alert( element.parentNode.insert( newElement.childElements()[0] ) );
	alert( element.insert( {after: newElement.childElements()[0] } ) );

	//var login_form = new LoginForm( $('login_form') );

	//login_form.setValue( { name: 'siddick', password: 'password', isadmin: 'admin', color: 'green'  } );
});
