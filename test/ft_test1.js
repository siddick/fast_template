/* Testing the Class Methods and Class Method Inherit in the Child Class */
var CBase = FT.Class.create( {
	self: {
		hai: function(){
			alert( "Hai from Class Method" );
		}
	},
	hai: function(){
		alert( "Hai from Class Object" );
	}
});


var CBaseNew = FT.Class.create( CBase, {
	self: {
		hai: function(){
			alert( "Hai from CBaseNew Class" );
		}
	},
	hai: function(){
		alert( "Hai from CBaseNew Object" );
	}
});

var obj = new CBaseNew();
CBaseNew.hai();
obj.hai();
CBase.hai();

