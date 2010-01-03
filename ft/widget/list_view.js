/*
	create({
		fields: Array,
			fieldName: String,
			displayName: String,
			displayType: String,
			sortType: String
		filters: Array,
			fieldName: String,
			displayName: String,
			filterType: String
		defaultFilter: Hash,
		dataUrl: String,
		dataUrlParams: Hash,
	})
*/
FT.Widget.ListView = FT.Class.create( FT.Widget.Base, {
	init: function( element ){
		this._loadListview();
	},
	_loadListview: function(){
		this._loadFilters();
		this._loadTable();
		this.loadPage();
	},
	_loadTable: function(){
		this.listview   = new FT.Util.ListView( this.element, this.config );
		this.paginator  = new FT.Util.Paginator( this.listview.getFooter(), {
			totalRecords: 110,
			displayPages: 10,
			displayRecords: this.config.displayRecords||10,
			currentPage: 1,
			request: this.requestPage.bind( this )
		});
		this.requestPage( 0, this.config.displayRecords||10 );
	},
	_loadFilters: function(){
	},
	loadPage: function( pageNo ){
	},
	addRecords: function( records ){
		this.listview.addRecords( records );
	},
	getSelectedRecords: function(){
		return this.listview.getSelectedRecords();
	},
	requestPage: function( offset, limit ){
		FT.Communication.Default.request( this.config.dataUrl, 
			Object.extend({offset: offset, limit: limit}, this.config.dataUrlParams ),
			this._requestPageHandler.bind( this )
		);
	},
	_requestPageHandler: function( response ){
		var value = response.evalJSON();
		if( Object.isArray(value) ){
			this.addRecords( value );
		} else {
			if( value.records ){
				this.addRecords( value.records );
			}
			if( value.paginator ){
				var page = value.paginator;
				this.paginator.reset( page.totalRecords, page.displayRecords, 
					page.displayPages, page.currentPage, page.displayPageFrom );
			}
		}
	}
});
