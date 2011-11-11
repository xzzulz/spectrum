//
// ink - okami parser
//
// parser module
//
// this is the main control module.
// that directs the parsing operation
// using the various other modules.
//
var parser = function() {

	var pub = {}

	// source code
	pub.source = ''



	pub.tree = null
	var tree = null

		
	
	// parse the source code
	pub.parse = function( source ) {
		
		pub.source = source
		
		// create tree top node
		tree = pub.tree = blue.tree.node( 'root' )
		
		
		// set view html container for nodes
		leaves.html( $( '#bits_box' ) )
		
		// brek source in lines and create the initial tree
		breakLines()
		
		// draw the tree
		//leaves.draw( tree )	



		tree = tokenizer.tokenize( tree )

		// draw the tree
		leaves.draw( tree )
		
			
		//tree = tabbing.to_blocks( tokens_tree )
		
		//console.log( tree )
	}




	// break into lines
	var breakLines = function() {
		
		var source_lines = pub.source.split('\n')
		
		for( var i=0; i<source_lines.length; i++ ) {
			
			var line = o_line.new( i, source_lines[i] )
			
			var node = blue.tree.node( line )
			tree.sub.add( node )
			
		}	
		
		// remove trailing empty nodes
		while( tree.sub.last.item.source == '' ) {
			tree.sub.last.rip()
		}
	}





	return pub;
	
}();




