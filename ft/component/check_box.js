FT.Component.CheckBox = FT.Class.create( FT.Component.Base, {
	init: function( element ){
		/* Nothing to do */
	},
	getActualValue: function(){
		var value = this.element.checked;
		if( value ){
			if( !Object.isUndefined(this.config.trueValue) ){
				value = this.config.trueValue;
			}
		} else {
			if( !Object.isUndefined(this.config.falseValue) ){
				value = this.config.falseValue;
			}
		}
		return value;
	},
	setActualValue: function( value ){
		var checkValue = false;
		if( value ){
			if( !Object.isUndefined(this.config.trueValue) ){
				if(  value == this.config.trueValue ) {
					checkValue = true;
				}
			} 
		} 
		this.element.checked = checkValue;
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
	}
});
