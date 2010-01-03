FT.Util.ListView = FT.Class.create( {
	initialize: function( element, config ){
		this.element = element;
		this.config  = config;
		this._loadTable();
	},
	_loadTable: function(){
		this._table = new Element('table');
		this.element.appendChild( this._table );

		this._tableBody = new Element('tbody');
		this._tableHead = new Element('thead');
		this._tableFoot = new Element('tfoot');
		this._table.appendChild( this._tableBody );
		this._table.appendChild( this._tableHead );
		this._table.appendChild( this._tableFoot );

		this._tableHeadTr = new Element('tr');
		this._tableFootTr = new Element('tr');
		this._tableHead.appendChild( this._tableHeadTr );
		this._tableFoot.appendChild( this._tableFootTr );

		this._tableFootTrTd = new Element('td');
		this._tableFootTr.appendChild( this._tableFootTrTd );

		this._loadFields();
	},
	_loadFields: function(){
		if( !this.config.fields ){ throw("No Field Configuration for List View"); }
		this.fields = [];

		var th = new Element('th', { style:'text-align:left;' } );
		th.update( '#' );
		this._tableHeadTr.appendChild( th );

		var fIndex, fields = this.config.fields;
		for( fIndex = 0; fIndex < fields.length; fIndex++ ){
			this.addField( fields[fIndex] );
		}
		this._tableFootTrTd.setAttribute( 'colspan', fields.size() + 1 );
	},
	addField: function( field ){
		var th = new Element('th', { style:'text-align:left;' } );
		th.update( field.displayName );
		
		this._tableHeadTr.appendChild( th );

		this.fields.push( field );

	},
	clearRecords: function(){
		this._tableBody.update();
	},
	addRecords: function( records ){
		this.clearRecords();
		this.records = [];
		this.checkBoxs = [] 
		for( var rIndex = 0 ; rIndex < records.length; rIndex++ ){
			this.addRecord( records[rIndex] );
		}
	},
	addRecord: function( record ){
		var fIndex, fields, field, recordIsArray, node, td, tr = new Element('tr');
		this._tableBody.appendChild(tr);

		fields = this.fields;

		recordIsArray = Object.isArray( record );

		td = new Element('td');
		tr.appendChild( td );
		td.appendChild( this.getCheckBox( this.records.length ) );
		this.records.push( record );

		for( fIndex = 0; fIndex < fields.length; fIndex++ ){
			field = fields[fIndex];
			if( recordIsArray ){
				node = this.getNode( record[fIndex], field );
			} else {
				node = this.getNode( record[field.fieldName], field );
			}
			td = new Element( 'td' );
			tr.appendChild( td );
			td.appendChild( node );
		}
	},
	getCheckBox: function( recordIndex ){
		var checkbox = new Element('input');
		checkbox.setAttribute('type', 'checkbox');
		Event.observe(checkbox, 'click', this.selectRecord.bind( this, recordIndex ));
		this.checkBoxs[recordIndex] = checkbox;
		return checkbox;
	},
	selectRecord: function( recordIndex ){
		if( this.config.selectType == 'single' ){
			if( !Object.isUndefined(this._lastSelectIndex) && this._lastSelectIndex != recordIndex ){
				this.checkBoxs[this._lastSelectIndex].checked = false;
			}
			this._lastSelectIndex = recordIndex;
			this.checkBoxs[recordIndex].checked = true;
		}
	},
	getNode: function( value, field ){
		var node;
		if( Object.isUndefined(value) ){
			value = '';
		}
		node = document.createTextNode( value )
		return node;
	},
	getSelectedRecords: function(){
		var records = [], rIndex ;
		for( rIndex = 0; rIndex < this.checkBoxs.length; rIndex++ ){
			if( this.checkBoxs[rIndex] ){
				if( this.checkBoxs[rIndex].checked ){
					records.push( this.records[rIndex] );
				}
			}
		}
		return records;
	},
	getFooter: function(){
		return this._tableFootTrTd;
	}
});
