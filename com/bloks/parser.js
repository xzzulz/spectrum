var parser = function() {

	var pub = {}

	// source code
	pub.source = ''



	pub.tree = null
	var tree = pub.tree
	
	
	var lines = []
	
	var tokens_tree = null


	
	
	// parse the source code
	pub.parse = function() {
		
		breakLines()		
		
		tokens_tree = tokenizer.tokenize( lines )
		
		console.log( tokens_tree )
		
		return
		
		tree = tabbing.to_blocks( tokens_tree )
		
	}




	// break into lines
	var breakLines = function() {
		
		lines = pub.source.split('\n')
	}





	return pub;
	
}();




