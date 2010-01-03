/*
	create({
		formHtml: String,
		formUrl: String,
		formUrlParams: Hash,

		form: FT.Complete.Form,

		data: Hash,
		dataUrl: String,
		dataUrlParams: Hash,

		submitUrl: String,
		submitUrlParams: Hash,

		onSubmitResponse: Function( responseText ),
		onSubmit: Function()
	});
*/

FT.Widget.Form = FT.Class.create( FT.Widget.Base, {
	init: function( element ){
		this._loadForm();
	},
	_loadForm: function(){
		if( this.config.formHtml ){ 
			this.loadForm( this.config.formHtml ); 
		} else if( this.config.formUrl ){
			this.element.hide();
			FT.Communication.Default.request( this.config.formUrl,
				this.config.formUrlParams,
				this.loadForm.bind(this));
		}
	},
	loadForm: function( html ){
		var element = this.getElement();
		if( html ){
			element.update( html );
		}
		if( this.config.form ){
			this.form = new this.config.form( element, this );
			this._loadData();
		}
	},
	_loadData: function(){
		this.form.disable();
		if( this.config.data ){
			this.loadData( this.config.data );
		} else if( this.config.dataUrl ){
			FT.Communication.Default.request( this.config.dataUrl,
				this.config.dataUrlParams,
				this.loadData.bind(this));
		}
	},
	loadData: function( data ){
		if( this.form ){
			if( Object.isString(data) ){
				this.form.setValue( data.evalJSON() );
			} else {
				this.form.setValue( data );
			}
		}
		this.form.enable();
		this.element.show();
	},
	submit: function( key ){
		this.form.disable();
		key = key || 'submit_value';
		if( this.config.submitUrl ){
			var params = Object.clone(this.config.submitUrlParams) || {};
			if( this.form ){
				try{
					params[key] = this.form.getValue().toJSON();
					FT.Communication.Default.request( this.config.submitUrl,
						params, this.submitResponseHanlder.bind(this) );
				} catch( msg ){
					if( Object.isString( msg )){ 
						alert( msg );
						this.form.enable();
				       	} else if( msg.element && msg.message ){
						alert( msg.message );
						this.form.enable();
						msg.element.focus();
					} else {
						this.form.enable();
					}
					return;
				}
				if( this.config.onSubmit ){
					this.config.onSubmit.bind(this)();
				}
			}
		}
	},
	submitResponseHanlder: function( text ){
		if( this.config.onSubmitResponse ){
			this.config.onSubmitResponse.bind(this)(text);
		}
		this.form.enable();
	},
	getForm: function(){
		return this.form;
	}
});
