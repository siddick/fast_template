FT.Util.Validation = {
	_throwError: function( element, errorMessage ){
		if( element ){
			throw( { element: element, message: errorMessage } );
		} else {
			throw( errorMessage );
		}
	},
	empty: function( value, errorMessage, element ){
		if( value.match( /^\s*$/ ) ){
			this._throwError( element, errorMessage );
		}
	},
	equal: function( value, cmpValue, errorMessage ){
		if( value == cmpValue ){
			this._throwError( errorMessage );
		}
	},
	notEqual: function( value, cmpValue, errorMessage ){
		if( value != cmpValue ){
			this._throwError( errorMessage );
		}
	},
	match: function( value, cmpValue, errorMessage ){
		if( value.match(cmpValue) ){
			this._throwError( errorMessage );
		}
	},
	notMatch: function( value, cmpValue, errorMessage ){
		if( !value.match(cmpValue) ){
			this._throwError( errorMessage );
		}
	},
	range: function( value, startValue, endValue, errorMessage ){
		if( value >= startValue && value <= endValue ){
			this._throwError( errorMessage );
		}
	},
	notRange: function( value, startValue, endValue, errorMessage ){
		if( value < startValue || value > endValue ){
			this._throwError( errorMessage );
		}
	}
};
