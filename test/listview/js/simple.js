var ListviewCont = FT.Widget.ListView.create({
	dataUrl: 'data/simple.json',
	fields: [
		{ fieldName: 'id', displayName: 'ID' },
		{ fieldName: 'name', displayName: 'Name' }
	]
});

Event.observe(window,'load', function(){
	var listview = new ListviewCont( $('listview_cont') );
	listview.addRecords([
		[ 1, 'abc' ],
		[ 2, 'siddick'],
		[ 3, 'xyz']
	]);
});
