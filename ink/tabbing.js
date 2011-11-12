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
		
		break_bloks2()
		
		return tree
		
	}
	
	
	
	
	// path of bloks
	var path = []
	// current blok
	var at_blok
	// current tab lvl
	var tab_lvl
	
	
	
	var break_bloks2 = function() {
		
		// set starting tab level
		tab_lvl = count_tabs( tree.sub.first )
		// set starting blocks path
		path.push( tree )
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
			
			//close_blok()
		
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
		path.push( blok_node )
		// set the current blok
		at_blok = blok_node
		
		
		// add the node to the blok
		node.rip()
		blok_node.sub.add( node )
		

	}

	
	
	
	var close_blok = function() {
		
	}
	
		
	
	
	// count tabs at start of line
	var count_tabs = function( line_node ) {
		
		var tabCount = 0
		while( line_node.sub.at( tabCount ).item.bit == 'tab' ) 
			tabCount++
			
		return tabCount
	}
	
	





	return pub
	
}()





