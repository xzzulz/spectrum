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
	var bloks

	
	// operators
	var group_start = '('
	var group_end = ')'
	
	
	// get all blok nodes in the tree
	// for each blok node process grouping on direct subs	
	pub.group = function( par_tree ) {
		
		tree = par_tree
		
		bloks = []
		
		// root is the first blok
		bloks.push( tree ) 
		
		// collect list of blok nodes in the tree
		tree.walk( grab_bloks ) 
				
		for( var i=0; i<bloks.length; i++ ) {

			process_blok( bloks[i] )
		}
		
	}
	
	
	
	// grab blok nodes
	var grab_bloks = function( node ) {
		
		if( node.item.type == 'blok' )
			bloks.push( node )
	}
	
	
	// counter of opened groups nodes in current blok
	var group_lvl
	
	// list (array) of references to nodes of  
	// groups, in current blok.
	// the current group is not included in the list
	var groups
	
	
	// insertion point
	// group -> line
	
	
	// current insertion group node. 
	// this where lines of bits inside 
	// the group will be pasted.
	var at_group

	// current insertion line node. this where bits nodes 
	// inside the group will be pasted.
	//var at_line	
	
	
	// 
	var process_blok = function( blok ) {
				
		// "expand" all grouping operators nodes in the blok
		// ( splits grouping operators into single lines )
		var node = blok.sub.first

		while( node ) {
			
			if( node.item.type == 'line' )
				expand_line( node )
			node = node.next
		}	
		
		
		make_groups( blok )

	}
	
	



	// find grouping operators in a line.
	// splits the line at these points
	var expand_line = function( line_node ) {
		
		var pik = line_node.sub.first
		var bit = ''
		var line_rest
		
		if( line_node.sub.n == 1 ) return
		
		// walk all bits of the line
		while( pik ) {
						
			bit = pik.item.bit
						
			// break line on grouping bits
			if( bit == group_start || bit == group_end ) {
				
				line_rest = after_op( line_node, pik )
				if( line_rest )
					line_rest.put_after_of( line_node )
				
				line_op = grab_operator( line_node, pik )
				if( line_op )
					line_op.put_after_of( line_node )
			}
			
			pik = pik.next
			
		}
	}




	// get rest of line after grouping operator
	var after_op = function( line_node, node ) {		
		
		if( line_node.sub.last == node )
			return null
		
		// update source code data
		
		// base data
		var split_index = node.item.source.from
		var sourcecode = line_node.item.source.code
		var line_number = line_node.item.number


		// create a new line with the rest of the sourcecode
		var line_rest = o_line.new( line_number, '' )
		line_rest.source.from = split_index + 1
		line_rest.source.to = line_node.item.source.to
		line_rest.source.code = sourcecode.substring( split_index + 1 )
		
		var line_rest_node = blue.tree.node( line_rest )
		
		line_node.item.source.to = split_index - 1
		line_node.item.source.code = sourcecode.substring( 0, split_index )
		
		// move corresponding nodes from line_one 
		// to line_rest
		var move_node = node.next
		var jump_node = node.next

		while( jump_node ) {
			jump_node = jump_node.next
			line_rest_node.sub.add( move_node.rip() )
			move_node = jump_node
		}
		
		return line_rest_node
	}



	// gets a grouping operator "node" (the parameter) in a line.
	// return the grouping operator in a new line node.
	// it is expected that the grouping operator is the last
	// bit in the line.
	// if the grouping op is the only bit in the line, 
	// then return null
	var grab_operator = function( line_node, node ) {
		
		if( line_node.sub.n == 1 ) 
			return null
			
		// create a new line for the groupin operator
		
		// base data
		var split_index = node.item.source.from
		var sourcecode = line_node.item.source.code
		var line_number = line_node.item.number

		
		var line_op = o_line.new( line_number, '' )
		line_op.source.from = split_index
		line_op.source.to = split_index
		line_op.source.code = node.item.bit
		
		var line_op_node = blue.tree.node( line_op )

		line_op_node.sub.add( node.rip() )
		
		return line_op_node
		
	}






	var make_groups = function ( blok ) {
		
		group_lvl = 0
		groups = []
		at_group = blok
		
		var nodes =	blok.sub.list()
		
		
		for( var i=0; i<nodes.length; i++ ) 
			group_nodes( nodes[i] )
				
	}



	var group_nodes = function( node ) {
		
		
		var bit = node.sub.first.item.bit
		
		// :: group start
		if( bit == group_start ) 
			start_group( node )
			//console.log('group_start')
			

		// :: group end
		else if( bit == group_end ) 
			end_group( node )	
			//console.log('group_end')
			
			
		// if node is not in the current group,
		// put it there.
		else if( node.top != at_group )
			at_group.sub.add( node.rip() )
	}
	
	
	
	var start_group = function( node ) {
		
		group_lvl++
		groups.push( at_group )
		 
		
		// create a new group node
		
		var group = o_group.new()
		
		group.source.line_from = node.item.number
		group.source.from = node.item.source.from
		
		at_group = blue.tree.node( group )
		
		// insert group in tree
		at_group.put_after_of( node )
		
		// discard grouping operator
		node.rip()
	}


	var end_group = function( node ) {
		
		if( group_lvl == 0 ) 
			throw 'close group operator error on line ' + node.item.number
		
		// move up in the groups hierarchy
		at_group = groups.pop()
		
		group_lvl--
		
		// discard grouping operator
		node.rip()
	}



	return pub
	
}()
