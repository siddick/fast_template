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
		this.paginator  = new FT.Util.Paginator( this.listview.getFooter(), 51, 10 );
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
	}
});
