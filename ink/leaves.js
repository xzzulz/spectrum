


var leaves = function() {
	
	
	var pub = {}
	
	
	var view = {}
	
	
	// the main html container for nodes
	view.html_box
	
	
	// set the view html element
	pub.html = function( par_html ) {
				
		view.html_box = par_html

	}
	
	
	
	// draws the tree in the view
	pub.draw = function( tree ) {
				
		$( view.html_box ).empty()
		
		tree.walk( paint_node )
	}
	
		
	

	
	
	var paint_node = function( node ) {
		
		console.log( 'paint node' )
		console.log( 'node.item.id: ' + node.item.id )
		console.log( 'node.item.type: ' + node.item.type )
		console.log( 'node.top: ' + node.top.item )
		
		
		if( node.top.item == 'root' ) {	
			// node is a line
			var label = node.item.source
			var id = node.item.id
					
			// html for line node
			var html = '<div id="box_{id}" class="line_box">'
			+ '<div id="node_{id}" class="line_node"></div>'
			+ '<div id="node_label_{id}" class="line_node_label">{label}</div>'
			+ '<div class="line_sub_box"></div>'
			+ '</div>'
			
			// assign the id and label
			html = html
				.replace( '{id}', id )
				.replace( '{id}', id )
				.replace( '{id}', id )
				.replace( '{label}', label )
		
		} else {
			// node is a bit
			var bit = node.item.bit
			var id = node.item.id
			
			console.log( 'node.bit: ' + node.bit )
			
			// html for bit node
			var html = '<div id="box_{id}" class="bit_box">'
			+ '<div id="node_{id}" class="bit"></div>'
			+ '<div id="node_label_{id}" class="bit_label">{bit}</div>'
			+ '</div>'
			
			// assign the id and label
			html = html
				.replace( '{id}', id )
				.replace( '{id}', id )
				.replace( '{id}', id )
				.replace( '{bit}', bit )
				
		}
		
		

		
		if( node.top.item == 'root' )
			// append to root node
			$( html ).appendTo( view.html_box )
		else {
			// append to top line node
			var top_node_id = '#box_' + node.top.item.id + ' .line_sub_box'
			$( html ).appendTo( $( top_node_id ) )
		}
		
		
	}


	
	
	return pub
}()



