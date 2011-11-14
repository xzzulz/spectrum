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
		
		console.log( 'group blok: ===============================' )
		console.log( blok )
		console.log( 'group blok: ===============================' )
				
		group_lvl = 0
		groups = []
		at_group = blok
		
		// "expand" all lines in the blok
		var node = blok.sub.first

		while( node ) {
			
			if( node.item.type == 'line' )
				expand_line( node )
			node = node.next
		}	

	}


	// find group operators in a line.
	// splits the line at these points
	var expand_line = function( line_node ) {
		
		var pik = line_node.sub.first
		var bit = ''
		var line_rest
		
		if( line_node.sub.n == 1 ) return
		
		while( pik ) {
						
			bit = pik.item.bit
			
			console.log('bit: ' + bit)
			
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




















	// process a node in a blok
	var process_blok_sub = function( node ) {
		
		
		var pik = node.sub.first
		
		while( pik ) {

			// if the node is not in the current
			// insertion group, rip it
			// and paste to the current insertion group
			if( node.top != at_group )
				at_group.sub.add( node.rip() )			
			
		}
		

		
		
		// scan nodes in a line
		if( node.item.type == 'line' ) {
			
			// set the current line
			// at_line = node
			
			node.sub.each( scan_node )
		
		}
			
	}


	var scan_node = function( node ) {
		
		console.log( 'scan_node: ' + node.item.type )
		
		if( node.item.type != 'bit' ) return
		
		var bit = node.item.bit
		
		// :: grouop start
		if( bit == group_start ) 
			start_group( node )

		// :: group end
		else if( bit == group_end ) 
			end_group( node )	
		
		// :: bit node
		// if node is not in the current insertion point:
		//     current group -> current line
		// rip it and paste the node into the current 
		// line in the current group
		// else if ()
	}	
	
	
	
	
	var start_group = function( node ) {

		console.log( 'start_group' )
		console.log( 'node:' )
		console.log( node )
		//return
		
		// create a new group node
		
		var group = o_group.new()
		
		group.source.line_from = node.item.number
		group.source.from = node.item.source.from
		
		var group_node = blue.tree.node( group )
		
		
		var previous_group = at_group
		
		// add the previous current group to the groups path
		groups.push( at_group )
		
		// set the new group node as current group 
		at_group = group_node
		
		// get the line node of the bit node
		var line_node = node.top
		
		console.log('------------')
		console.log('at_group.put_after_of( line_node )' )
		
		console.log('at_group:')
		console.log( at_group)
		console.log('line_node:')
		console.log(line_node)
		console.log('------------')
		
		// add the group node just after
		// the line where the start operator is
		at_group.put_after_of( line_node )
		
		
		// determine what to do with the line node
		
		// if open group operator is alone in the line
		// discard the line
		if( line_node.sub.n == 1 ) {
			
			line_node.rip()
			return
		}
		
		
		// if the start group operator is at the start
		// of the line, place the whole line in the group
		else if( line_node.sub.first == node ) {
			
			at_group.sub.add( line_node.rip() )			
		}


		// if the start group operator is at the end
		// of the line, leave the line were it is
		else if( line_node.sub.last == node ) {

		}
		
		
		// else, add the splited line
		else {
			
			
			
			var line_parts = split_line( line_node, node )
			console.log('---------------------')
			console.log('split_line:')
			console.log( line_node )
			
			console.log('first:')
			console.log( line_parts.first )
			
			console.log('last:')
			console.log( line_parts.last )
			
			console.log('---------------------')
			
			if( line_parts.first.sub.n == 0 )
				line_parts.first.rip()
			
			if( line_parts.last.sub.n > 0 )
				at_group.sub.add( line_parts.last )
		
		}
		
		// set the current line
		//at_line = at_group.last
			
		
		// increase groups nesting level
		group_lvl++
		
		
		// remove and discard the open group operator bit node
		node.rip()

		
	}
	

/*
	// split a line in two at node, and returns
	// the both pieces in an object
	var split_line = function( line_node, node ) {
		
		console.log('split_line:')
		console.log( line_node )
				
		// get node char index pos in source code
		var from = node.item.source.from
		
		// the whole line will be transformed into the first piece
		line_node.item.source.to = from - 1
		
		// create the new line
		var line_two = o_line.new( line_node.item.number, '' )
		line_two.source.from = from
		line_two.source.to = line_node.item.source.to
		line_two.source = line_node.item.source.code.substring( from )
		
		var line_two_node = blue.tree.node( line_two )
		
		// move corresponding nodes from line_one 
		// to line_two
		var move_node = node
		var jump_node = node
		while( move_node ) {
			jump_node = jump_node.next
			line_two_node.sub.add( move_node.rip() )
			move_node = jump_node
		}
		
		return { first: line_node, last: line_two_node }
	}
*/



	var end_group = function( node ) {
		
		
		console.log('end_group')
		console.log( 'node:' )
		console.log( node )
		
		return
		
		
		if( group_lvl == 0 ) throw 'close group operator error'
		
		var line_node = node.top
				

		// set upper group as the new current group
		var ended_group = at_group 
		at_group = groups.pop()
		
		
		
		// determine what to do with the line node
		
		// if end group operator is alone in the line
		// discard the line
		if( line_node.sub.n == 1 ) {
			
			line_node.rip()
			return
		}

		
		// if the start group operator is at the end
		// of the line, move the whole line to the just
		// ended group
		else if( line_node.sub.last == node ) {
			ended_group.sub.add( line_node.rip() )	
		}
		
				
		// if the end group operator is at the start
		// of the line, place the whole line after the group
		else if( line_node.sub.first == node ) {
			at_group.sub.add( line_node.rip() )
		}



		// else, the line must be splited
		
		
		else {
			
			var line_parts = split_line( line_node, node )
			
			// the just ended group get the first part
			if( line_parts.first.sub.n > 0 )
				ended_group.sub.add( line_parts.first )
			
			// the new current group gets the last part
			// just after the closed blok
			if( line_parts.last.sub.n > 0 )
				line_parts.last.put_after_of( ended_group )
		
		}


		
		// decrease groups nesting level
		group_lvl--
		
		
		// remove and discard the open group operator bit node
		node.rip()
		
		
		
	}

	
	
	return pub
	
}()
