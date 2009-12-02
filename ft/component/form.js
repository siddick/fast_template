FT.Component.Form = FT.Class.create( FT.Component.Base, {
	init: function( element ){
		this.fields = new Hash();
		if( this.config && this.config.fields ){
			this.findFields( element, this.config.fields );
		}
	},
	findFields: function( element, fields ){
		var name = element.getAttribute('name');
		if( name ){
			if( fields[name] ){
				var field = this.fields.get(name);
				if( field ){ /* Handle Radio Button */
					if( field.addElement ){
						field.addElement( element );
					}
				} else{
					this.fields.set(name, new fields[name]( element, this ));
				}
				return;
			}
		}
		var elements = element.childElements();
		for( var eIndex = 0; eIndex < elements.length; eIndex++ ){
			this.findFields( elements[eIndex], fields );
		}
	},
	getField: function( key ){
		return this.fields.get( key );
	},
	getActualValue: function(){
		var value = new Hash();
		var keys = this.fields.keys();
		for( kIndex = 0; kIndex < keys.length; kIndex++ ){
			var key = keys[kIndex];
			var val = this.fields.get( key ).getValue();
			if( !Object.isUndefined( val ) ){
				value.set( key, val );
			}
		}
		return value;
	},
	setActualValue: function( value ){
		for( var key in value ){
			var field = this.fields.get( key );
			if( field ){
				field.setValue( value[key] );
			}
		}
	},
	addObserverHandler: function( eventName, eventHandler ){
		/* Nothing to do */
	},
	activate: function( action ){
		if( action ){
			this.fields.each( function( ary ){
				ary[1].enable();
			});
		} else {
			this.fields.each( function( ary ){
				ary[1].disable();
			});
		}
	}
});
