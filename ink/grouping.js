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
		
		console.log( 'bloks:' )
		console.log( bloks )
		
		for( var i=0; i<bloks.length; i++ ) {

			group_blok( bloks[i] )
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
	
	// work on subnodes of bloks
	var group_blok = function( blok ) {
		
		console.log( 'group blok: ========================= ' )
		console.log( blok )
		
		group_lvl = 0
		groups = []
		at_group = blok
		
		blok.sub.each( get_lines )
		
	}


	// get the lines of the current blok
	var get_lines = function( node ) {
		
		// if the node is not in the current
		// insertion group, rip it
		// and paste to the current insertion group
		if( node.top != at_group )
			at_group.sub.add( node.rip() )
		
		
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

		console.log('start_group')
		
		
		// create a new group node
		
		var group = o_group.new()
		
		group.source.line = node.item.source.line
		group.source.from = node.item.source.from
		
		var group_node = blue.tree.node( group )
		
		
		
		// add the previous current group to the groups path
		groups.push( at_group )
		
		// set the new group node as current group 
		at_group = group_node
		
		// get the line node of the bit node
		var line_node = node.top
		
		
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
		
		
		// else,add the splited line
		else
			at_group.sub.add( split_line( line_node, node ) )
		
		
		// set the current line
		//at_line = at_group.last
			
		
		// increase groups nesting level
		group_lvl++
		
		
		// remove and discard the open group operator bit node
		node.rip()

	}
	


	// split a line in two at node, and returns
	// the last part
	var split_line = function( line_one, node ) {
		
		// get node cahr index pos in source code
		var from = node.item.source.from
		
		line_one.to = from - 1
		
		// create the new line
		var line_two = o_line.new( line.one.number, '' )
		line_two.from = from
		line_two.to = line_one.to
		line_two.source = line_one.source.substring( from )
		
		var line_two_node = blue.tree.node( line_two )
		
		// move corresponding nodes from line_one 
		// to line_two
		var move_node = node
		while( move_node = move_node.next )
			line_two_node.sub.add( move_node.rip() )
		
		return line_two_node
	}




	var end_group = function( node ) {
		
		console.log('end_group')
		
		
		
		/*
		if( group_lvl == 0 )
			add_error()

		// current blok has ended
		// remove it from path
		at_group = path.pop()
		// set new current blok
		// the last in the past list

		node.rip()
		
		group_lvl--
		*/
	}

	
	
	return pub
	
}()
