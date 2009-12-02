var FT = {
	Class: {
		create: function( parentClass, methods ){
			var klass = null;
			if( !methods ) {
				methods = parentClass;
				parentClass = null;
			}

			if( parentClass ){
				klass = Class.create( parentClass, methods );
				if( parentClass.classMethods ){
					if( methods.self ){
						methods.self = Object.extend( Object.clone( parentClass.classMethods ), methods.self );
					} else {
						methods.self = parentClass.classMethods;
					}
				}
			} else {
				klass = Class.create( methods );
			}

			if( methods.self ){
				Object.extend( klass, methods.self );
				klass.classMethods = methods.self;
			}

			return klass;
		}
	},
	Component: {
	},
	Widget: {
	},
	Util: {
	},
	Communication: {
	}
};

FT.Base = FT.Class.create({
	self: {
		create: function( config ){
			var oldConfig = this.prototype.config;
			var newConfig = Object.extend( Object.clone(oldConfig), config );
			return FT.Class.create( this, { config: newConfig } );
		}
	},
	config: {},
	getConfig: function( key ){
		return this.config[key];
	},
	getConfigs: function(){
		return config;
	}
});
