//
// ink - okami parser
//
// grouping module
//
// this module validates and convert the groupings
// operators, into nested nodes in the syntax tree
//
var grouping = function() {

	// public	
	var pub = {}
	
	// process

	
	
	var tree

	// list of bloks in the tree
	var groups = []

	
	// operators
	var group_start = '('
	var group_end = ')'
	
	
	// get all blok nodes in the tree
	// for each blok node process grouping on direct subs	
	pub.group = function( par_tree ) {
		
		tree = par_tree
		
		// root is the first blok
		bloks.push( tree ) 
		
		// collect list of blok nodes in the tree
		tree.walk( grab_bloks ) 
		
		
		for( var i=0; i<bloks.length; i++ ) {

			group_blok( bloks[i] )
		}
		
	}
	
	
	
	// grab blok nodes
	var grab_bloks = function( node ) {
		
		if( node.item.type = 'blok' )
			bloks.push( node )
	}
	
	
	
	var group_lvl
	
	var groups
	
	var at_group
	
	
	// work on subnodes of bloks
	var group_blok = function( blok ) {
		
		group_lvl = 0
		groups = []
		at_group = blok
		
		blok.sub.each( scan_bit )
		
	}



	var scan_bit = function( node ) {
				
		if( node.item.type != 'bit' ) return
		
		var bit = node.item.bit.bit
		
		if( bit == group_start )
			start_group( node )
		
		else if( bit == group_end ) {
			end_group( node )	
			
		}
	}	
	
	
	
	
	var start_group = function( node ) {

		var group = o_group.new()
		
		group.source.line = node.item.source.line
		group.source.from = node.item.source.from
		
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
		var group_node = blue.tree.node( group )
		
		if( node.top == at_group ) {
			group_node.put_before_of( node )
		}else{
			at_group.sub.add( group_node )
		}
				
		// add the previous current group to the path
		groups.push( at_group )
		// set the current group
		at_group = group_node
		
		
		// the grouping operator is discarded now
		node.rip()
		
		group_lvl++
		
		//blok_node.sub.add( node )		
		
	}
	


	var end_group = function( node ) {
		
		if( group_lvl == 0 )
			add_error()
		
		
		// current blok has ended
		// remove it from path
		at_group = path.pop()
		// set new current blok
		// the last in the past list

		node.rip()
		
		group_lvl--
			
	}

	
	
	return pub
	
}()
