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
	defaultJavascripts: {
		widget: [ 'base', 'form', 'list_view', 'tab_view' ],
		component: [ 'base', 'button', 'check_box', 'array_form', 'form',
			'input_box', 'label', 'radio_button' ],
		util: [ 'base', 'list_view', 'paginator', 'validation' ],
		communication: [ 'default', 'rails' ]
	},
	init: function( base ){
		this.baseUrl = base || '/';
		this.loadJavascripts( this.baseUrl, this.defaultJavascripts );
	},
	loadJavascripts: function( base, js ){
		if( Object.isArray(js) ){
			for( var i=0; i<js.length; i++ ){
				this.loadJavascripts( base, js[i] );
			}
		} else if( Object.isString(js) ){
			this.loadJavascript( base + js + '.js' );
		} else {
			for( var i in js ){
				this.loadJavascripts( base + i + '/',  js[i] )
			}
		}
	},
	loadJavascript: function( libraryName ){
    try{
      document.write('<script type="text/javascript" src="'+libraryName+'"><\/script>');
    } catch(e) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = libraryName;
      document.getElementsByTagName('head')[0].appendChild(script);
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
