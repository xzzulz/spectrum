


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
				
		var html = '<div id="box_{id}" class="node_box">'
		+ '<div id="node_{id}" class="node"></div>'
		+ '<div id="node_label_{id}" class="node_label">{label}</div>'
		+ '</div>'
		
		var label = node.item.source
		var id = node.item.id
		
		// assign the id 
		html = html
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{label}', label )
		
		id++
		
		// append to top node
		if( node.top.item == 'root' )
			$( html ).appendTo( view.html_box )
		else {
			var top_node_id = '#box_' + node.top.item.id
			console.log( 'append to: ' + top_node_id )
			$( html ).appendTo( $( top_node_id ) )
		}
		
		
	}


	
	
	return pub
}()



