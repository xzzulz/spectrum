var basic = {}

basic.source = ''
+'one\n'
+'two three\n'
+'one four\n'
+'	five\n'
+'	six\n'
+'	two four\n'
+'three';



basic.start = function() {
	
	$('#sourceBox').val( basic.source );
	
	
}



basic.parse = function() {
	
	parser.source = $('#sourceBox').val();
	
	parser.parse();
	
}
