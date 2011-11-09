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
	$('#txa_source').val( ini.source );
	
	// conect parse button
	$('#parse_button').click( ini.parse );
	
}
$( window ).load( ini.start )



ini.parse = function() {
	
	var source = $('#txa_source').val();
	
	parser.parse( source );
	
}
