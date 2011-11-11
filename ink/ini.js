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
	
	// init the micro text editor
	edit.ini()
	
	// conect parse button
	$('#parse_button').click( ini.parse );

	
}
$( window ).load( ini.start )


// function to parse the source code
// will be called on parse button click
ini.parse = function() {
	
	var source = $('#ink_box').val();
	
	parser.parse( source );
	
}
