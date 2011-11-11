


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
	
	/*
	var do_node = function( node ) {
		
		paint_node( node )
		
		if( node.sub.n > 0 )
			
	}
	*/
		
	
	// the id value is incremented with each view
	// node that is created
	var id = 0
	
	
	var paint_node = function( node ) {
					
		var html = '<div id="node_box_{id}" class="node_box">'
		+ '<div id="node_{id}" class="node"></div>'
		+ '<div id="node_label_{id}" class="node_label">{label}</div>'
		+ '</div>'
		
		var label = node.item.source
		
		// assign the id 
		html = html
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{label}', label )
		
		id++

		$( html ).appendTo( view.html_box )
		
	}


	
	
	return pub
}()



