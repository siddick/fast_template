FT.Communication.Rails = {
	request: function( url, params, handler ){
		var RH = FT.Communication.Rails.responseHanlder.bind( this, handler );
		new Ajax.Request( url, { 
			parameters: params, 
			onComplete: RH } );
	},
	responseHanlder: function( handler, response ){
		if( response.status == 200 ){
			handler( response.responseText );
		} else {
			alert("Error Response");
		}
	}
}
