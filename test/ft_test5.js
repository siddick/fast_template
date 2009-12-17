var NameListFormClass = FT.Component.Form.create({
	fields: {
		names: FT.Component.ArrayForm.create({
			minForms: 3,
			maxForms: 7,
			form: FT.Component.Form.create({
				fields: {
					name: FT.Component.InputBox,
					close: FT.Component.Button.create({
						events: {
							click: function( eventObj ){
								var form = this.getParent();
								form.getParent().removeForm( form );
								Event.stop( eventObj );
							}
						}
					}),
					up: FT.Component.Button.create({
						events: {
							click: function( eventObj ){
								var form = this.getParent();
								form.getParent().upForm( form );
								Event.stop( eventObj );
							}
						}
					}),
					down: FT.Component.Button.create({
						events: {
							click: function( eventObj ){
								var form = this.getParent();
								form.getParent().downForm( form );
								Event.stop( eventObj );
							}
						}
					})
				}
			})
		}),
		add: FT.Component.Button.create({
			events: {
				click: function(){
					this.getParent().getField('names').addForm();
				}
			}
		}),
		submit: FT.Component.Button.create({
			events: {
				click: function(){
					alert(this.getParent().getValue().toJSON());
				}
			}
		})
	}
});

Event.observe( window, 'load', function(){
	
 	var form = new NameListFormClass($('list'));
});
