FT.Component.Base = FT.Class.create( FT.Base, {
	initialize: function( element, parentObject ){
		this.element 		= element;
		this.parentObject 	= parentObject;
		this.eventHandlers	= new Hash();
		this.init( element );
		if( this.config && this.config.events ){
			this.addEventHandlers( this.config.events );
		}
	},
	getElement: function(){
		return this.element;
	},
	getParent: function(){
		return this.parentObject;
	},
	getValue: function(){
		var value = this.getActualValue();
		if( this.config && this.config.getFunctionCall ){
			value = this.config.getFunctionCall.bind(this)(value);
		}
		return value;
	},
	setValue: function( value ){
		if( this.config && this.config.setFunctionCall ){
			value = this.config.setFunctionCall.bind(this)(value);
		}
		this.setActualValue( value );
	},
	addEventHandlers: function( events ){
		if( events ){
			for( var eventName in events ){
				this.addEventHandler( eventName, events[eventName] );
			}
		}
	},
	addEventHandler: function( eventName, eventHandler ){
		var handlers = this.eventHandlers.get( eventName );
		if( !handlers ){
			var eventHandlerBind = this.handleEvent.bind(this, eventName );
			handlers = [];
			this.eventHandlers.set( eventName, handlers );
			this.addObserverHandler( eventName, eventHandlerBind );
		}
		handlers.push( eventHandler );
	},
	handleEvent: function( eventName ){
		var handlers = this.eventHandlers.get( eventName );
		if( handlers ){
			for( var index = 0; index < handlers.length; index++ ){
				handlers[index](this);
			}
		}
	},
	show: function(){
		this.element.show();
	},
	hide: function(){
		this.element.hide();
	},
	enable: function(){
		this.activate( true );
	},
	disable: function(){
		this.activate( false );
	},
	init: function( element ){
		throw("Implement the function init()");
	},
	getActualValue: function(){
		throw("Implement the function getActualValue()");
	},
	setActualValue: function( value ){
		throw("Implement the function setActualValue( value )");
	},
	addObserverHandler: function( eventName, eventHandler ){
		throw("Implement the function addObserverHandler(eventName, eventHandler)");
	},
	activate: function( active ){
		throw("Implement the function activate( active )");
	},
	focus: function(){
		throw("Implement the function focus()" );
	}  
});
