var ini = {}


ini.source = ''
+'one\n'
+'two three\n'
+'one four\n'
+'	five\n'
+'	six\n'
+'	two four\n'
+'three';



ini.start = function() {
	
	// set some source code
	//$('#ink_box').html( ini.source );
	edit.ini()
	
	// conect parse button
	$('#parse_button').click( ini.parse );
	
	// conect edit button
	$('#edit_button').click( edit.action );
	
}
$( window ).load( ini.start )



ini.parse = function() {
	
	var source = $('#ink_box').val();
	
	parser.parse( source );
	
}
