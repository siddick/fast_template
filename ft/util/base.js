FT.Util.Base = FT.Class.create( FT.Base, {
	initialize: function( element, parentObject ){
		this.element 		= element;
		this.parentObject 	= parentObject;
		this.init( element );
	},
	getElement: function(){
		return this.element;
	},
	getParent: function(){
		return this.parentObject;
	},
	init: function(){
		throw("Implement the function init() in Util Class");
	}
});
