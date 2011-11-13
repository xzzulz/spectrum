//
// ink - okami parser
//
// tabbing module
//
// this module reads the tabs indentation tokens, 
// and convert them into nested blocks of code
// in the tree
//
var tabbing = function() {

	// public	
	var pub = {}
	
	// input: lines of tokens
	//var lines
	
	// output
	var tree
	
	
	
	// process tabs in a tokens_tree, and 
	// creates code blocks based on 
	// indentation (tabs only)
	pub.to_blocks = function( par_tree ) {
		
		tree = par_tree
		
		break_bloks()
		
		return tree
		
	}
	
	
	
	
	// list of current nested bloks
	// from root, to bottom
	var path
	// current blok
	var at_blok
	// current tab lvl
	var tab_lvl
	
	
	
	var break_bloks = function() {
		
		// set starting tab level
		tab_lvl = count_tabs( tree.sub.first )

		// store the initial tab level in the root node
		tree.item.tabs = tab_lvl
		
		console.log('break_bloks ============================================')
		
		// put root node at top of path
		path = []


		// set current blok
		at_blok = tree
		
		// get subs in array
		var nodes = []
		var get_sub = function( node ) { nodes.push( node ) }
		tree.sub.each( get_sub )
				
		for( var i=0; i<nodes.length; i++ ) {
			tab_it( nodes[i] )
		}
		
	}
	
	
	
	var tab_it = function( node ) {
		
		// count tabs of this node
		var tabs = count_tabs( node )
			
		
		// if tabs increased
		if( tabs > tab_lvl ) {
						
			// start blok
			start_blok( node, tabs )
			// set new tabs lvl
			tab_lvl = tabs
			
		}else if ( tabs < tab_lvl ) {
			
			tab_lvl = tabs
			close_blok( node)
		
		}else if( tabs == tab_lvl ) {
			
			if( node.top != at_blok ) {
				node.rip()
				at_blok.sub.add( node )
			}
			
		}
		
	}



	var start_blok = function( node, tabs ) {

		var blok = o_blok.new()
		
		blok.tabs = tabs
		blok.source.line_from = node.item.number
		
		// now, where to put the new blok:
		//
		// blok		-> is the new, just created blok
		// at_blok	-> is the current blok at tab_lvl
		//
		// if node was in the current blok,
		// the new blok should go there
		//
		// if node was above current blok,
		// the new blok must go at last sub
		// of current blok
		
		// put the new blok in a node
		var blok_node = blue.tree.node( blok )
		
		if( node.top == at_blok ) {
			blok_node.put_before_of( node )
		}else{
			at_blok.sub.add( blok_node )
		}
				
		// add the new blok to the current path
		path.push( at_blok )
		// set the current blok
		at_blok = blok_node
		
		
		// add the node to the blok
		node.rip()
		blok_node.sub.add( node )
		

	}


	
	var close_blok = function( node ) {

		// current blok has ended
		// remove it from path
		at_blok = path.pop()
		// set new current blok
		// the last in the past list
		
		
		// continue removing bloks, until new tab level
		// is reached
		while( tab_lvl < at_blok.item.tabs ) {
			// blok ended, remove from path
			at_blok = path.pop()
		}
		
		// invalid indentation
		// insert error node
		if( tab_lvl > at_blok.item.tabs ) {
						
			//insert error node
			var bit = o_bit.new()
			bit.type = "error"
			bit.source.line = node.item.number
			bit.bit = 'indentation error'
			
			var error_node = blue.tree.node( bit )
			
			node.sub.insert( error_node, 0 )
			
		}
		
		tab_lvl = at_blok.item.tabs
		
		if( node.top != at_blok ) {
			node.rip()
			at_blok.sub.add( node )
		}
		
	}
	
		

	
	// count tabs at start of line
	var count_tabs = function( line_node ) {
		
		if( line_node.sub.n == 0 ) return 0
		
		var tab_count = 0
		while( line_node.sub.at( tab_count ).item.bit == 'tab' ) 
			tab_count++
			
		return tab_count
	}
	



	return pub
	
}()





