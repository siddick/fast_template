FT.Component.ArrayForm = FT.Class.create(FT.Component.Base,{
	init: function(element){
		this.forms 		= [];
		this.formClass = this.config.form;
		this.formHtml 	= this.getHTML(element);
	},
	getHTML: function( element ){
		var content = element.inspect() + element.innerHTML + '</' + element.tagName.toLowerCase() + '>';
		return content;
	}
	addForm: function( fromForm ){
		var element = this.getFormElement();
		if( Object.isUndefined(fromForm) ){
			fromForm = this.forms[ this.forms.length-1 ];
		}
		fromForm.getElement().inspect({ after: element });
	},
	getFormElement: function(){
		var newElement = new Element('span');
		newElement.update( this.formHtml );
		return newElement.childElements()[0];
	},
	removeForm: function( fromForm ){
	}
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
	}
});
