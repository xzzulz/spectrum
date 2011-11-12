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
		
		console.log( nodes )
		
		for( var i=0; i<nodes.length; i++ ) {
			tab_it( nodes[i] )
		}
		
	}
	
	
	
	var tab_it = function( node ) {
		console.log( '===================')
		console.log( 'tab_it ' + node.item.number )
		
		// count tabs of this node
		var tabs = count_tabs( node )
		
		// if tabs increased
		if( tabs > tab_lvl ) {
			
			console.log('start blok here')
			
			// start blok
			start_blok( node, tabs )
			// set new tabs lvl
			tab_lvl = tabs
			
		}else if ( tabs < tab_lvl ) {
			
			//close_blok()
		
		}else if( tabs == tab_lvl ) {
			console.log('same tab level')
			if( node.top != at_blok ) {
				console.log('rip node')
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
		
		console.log( 'blok_node created: ' )
		console.log( blok_node )
		
		
		if( node.top == at_blok ) {
			console.log( 'node.top == at_blok ' )
			blok_node.put_before_of( node )
		}else{
			console.log( 'node.top != at_blok' )
			at_blok.sub.add( blok_node )
		}
		
		console.log( 'blok_node created: ' )
		console.log( blok_node )
		console.log( 'put before of: ' )
		console.log( node )
		
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
	
	

	/*
	
	// break into blocks
	// indentation based
	var break_bloks = function() {

		var i, line = ''
		
		// tabs count, current tab level
		var tabs, tab_lvl
				
		// current path
		// path of container bloks
		var path = []
		
		// current blok
		var blok = tree
		
		//set starting tab level
		tab_lvl = count_tabs( lines[0] )
		// set the blok tabs level
		blok.tabs = tab_lvl
				
				
		tabs = 0;
		// for each line
		for( i=0; i<lines.length; i++ ) {
		
		
			line = lines[i]
												
			// count tabs at start of line
			tabs = count_tabs( line )
			
			// if higher tab level, start blok
			if( tabs > tab_lvl ) {
								
				// set new tabs level
				tab_lvl = tabs
				
				// create blok 
				parent = blok
				blok = []
				// add blok to parent
				parent.push( blok )
				// add parent to containers path
				path.push( parent )
				// set the new blok tabs level				
				blok.tabs = tabs
			}


			// if lower tab level, determine what to do
			if( tabs < tab_lvl ) {
				
				// set new tabs level
				tab_lvl = tabs
								
				// trackback tabs levels
				while( path[ path.length - 1 ].tabs > tab_lvl ) path.pop()
								
				// new tab level == to some parent blok 
				//	-> close bloks until that parent
				if( path[ path.length - 1 ].tabs == tab_lvl ) {
					blok = path.pop()
				
				// new tab level != to some parent blok 
				// invalid indentation
				} else {
						
					console.log( 'invalid indentation at line ' + (i+1) )
					return		
				}
							
			}

			// add line to current blok
			blok.push( line )
					
		}

	}	
	
	
	
	var tabCount
	//
	// count tabs at start of line
	//
	var count_tabs = function( line ) {
		
		tabCount = 0
		while( line.tokens[ 0 ].charAt( tabCount ) == '\t' ) tabCount++
		return tabCount
	}
	
	
	*/
	
	



	return pub
	
}()





