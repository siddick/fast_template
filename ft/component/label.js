FT.Component.Label = FT.Class.create( FT.Component.Base, {
	init: function( element ){
		/* Nothing to do */
	},
	getActualValue: function(){
		return this._value;
	},
	setActualValue: function( value ){
		this._value = value;
		this.element.update( value );
	},
	addObserverHandler: function( eventName, eventHandler ){
		Event.observe( this.element, eventName, eventHandler );
	},
	activate: function( action ){
	}
});
