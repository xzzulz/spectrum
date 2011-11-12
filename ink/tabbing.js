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
	
	
	
	
	



	return pub
	
}()





