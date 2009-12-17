FT.Component.ArrayForm = FT.Class.create(FT.Component.Base,{
	init: function(element){
		this.forms 		= [];
		this.formClass = this.config.form;
		this.formHtml 	= element.innerHTML;
		element.update();
		this.defaultForms = this.config.defaultForms || this.config.minForms || 1 ;
		this.minForms 	= this.config.minForms || 0;
		this.maxForms 	= this.config.maxForms || 1000;
		this.minFormsError = this.config.minFormsError || 'Minimum Form should be '+this.minForms;
		this.maxFormsError = this.config.maxFormsError || 'Maximum Form should be '+this.maxForms;

		this._handleMinForms();
	},
	addForm: function( fromForm ){
			if( this.forms.length >= this.maxForms ){
				alert(this.maxFormsError);
				return;
			}
			if( this.forms.length == 0 ){
				this.getElement().update( this.formHtml );
				this.forms.push( new this.formClass(this.getElement().down(0), this) );
			} else {
			  if( !fromForm ){
				  fromForm = this.forms[ this.forms.length-1 ];
			  }
			  var element = fromForm.getElement();
			  element.insert({ after: this.formHtml });
			  element = element.next();
			  this.forms.push( new this.formClass( element, this ) );
			}
	},
	removeForm: function( fromForm ){
		if( this.forms.length <= this.minForms ){
			alert(this.minFormsError);
			return;
		}
		this.forms = this.forms.without( fromForm );
		fromForm.getElement().remove();
	},
	upForm: function( fromForm ){
		var index = this.forms.indexOf( fromForm )
		if( index > 0 ){
			this.forms[index-1].getElement().insert({before: fromForm.getElement()});
			this.forms[index] 	= this.forms[index-1];
			this.forms[index-1] 	= fromForm;
		}
	},
	downForm: function( fromForm ){
		var index = this.forms.indexOf( fromForm )
		if( index >= 0 && (index != (this.forms.length - 1)) ){
			this.forms[index+1].getElement().insert({after: fromForm.getElement()});
			this.forms[index] 	= this.forms[index+1];
			this.forms[index+1] 	= fromForm;
		}
	},
	getActualValue: function(){
		var value = [];
		for( var fIndex = 0; fIndex < this.forms.length; fIndex++ ){
			value.push( this.forms[fIndex].getValue() );
		}
		return value;
	},
	setActualValue: function(value){
		for( var vIndex = 0; vIndex < this.value.length; vIndex++ ){
			var form = this.form[vIndex];
			if( form ){
				form.setValue( value[vIndex] );
			} else {
				this.addForm()( value[vIndex] );
			}
		}
	},
	addObserverHandler: function( eventName, eventHanlder ){
	},
	_handleMinForms: function(){
		for( var f_index = 0; f_index < this.defaultForms; f_index++ ){
			this.addForm();
		}
	}
});
