FT.Component.RadioButton = FT.Class.create( FT.Component.Base, {
	init: function( element ){
		this.radioButtons = [];
		this.radioEventHandlers = new Hash();
		this.addElement( element );
	},
	getActualValue: function(){
		for( var rIndex =0; rIndex < this.radioButtons.length; rIndex++ ){
			var button = this.radioButtons[rIndex];
			if( button.checked ){
				return button.value;
			}
		}
		return null;
	},
	setActualValue: function( value ){
		for( var rIndex =0; rIndex < this.radioButtons.length; rIndex++ ){
			var button = this.radioButtons[rIndex];
			if( button.value == value ){
				button.checked = true;
			} else{
				button.checked = false;
			}
		}
	},
	addObserverHandler: function( eventName, eventHandler ){
		/*Nothing to Do*/
		this.radioEventHandlers.set( eventName, eventHandler );
		for( var rIndex = 0; rIndex < this.radioButtons.length; rIndex++ ){
			var button = this.radioButtons[rIndex];
			Event.observe( button, eventName, eventHandler );
		}
	},
	addElement: function( element ){
		this.radioButtons.push( element );
		var keys = this.radioEventHandlers.keys();
		for( kIndex = 0; kIndex < keys.length; kIndex++ ){
			var eventName = keys[kIndex];
			var handler   = this.radioEventHandlers.get(eventName);
			Event.observe( element, eventName, handler );
		}
	},
	activate: function( action ){
		if( action ){
			for( var i=0; i<this.radioButtons.length; i++ ){
					  this.radioButtons[i].enable();
			}
		} else {
			for( var i=0; i<this.radioButtons.length; i++ ){
					  this.radioButtons[i].disable();
			}
		}
	}
});
