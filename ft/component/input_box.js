FT.Component.InputBox = FT.Class.create( FT.Component.Base, {
	init: function( element ){
		/* Nothing to do */
	},
	getActualValue: function(){
		return this.element.getValue();
	},
	setActualValue: function( value ){
		this.element.setValue( value );
	},
	addObserverHandler: function( eventName, eventHandler ){
		Event.observe( this.element, eventName, eventHandler );
	},
	activate: function( action ){
		if( action ){
			this.element.enable();
		} else {
			this.element.disable();
		}
	},
	focus: function(){
		this.element.focus();
	}
});

/*
 */
