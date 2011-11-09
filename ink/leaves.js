


var leaves = function() {
	
	
	var pub = {}
	
	
	var view = {}
	
	// the main html container for nodes
	view.html_box
	
	// set the view html element
	pub.html = function( par_html ) {
		
		view.html_box = par_html
		console.log( 'set view' )
		console.log(view.html_box)
	}
	
	
	
	// draws the tree in the view
	pub.draw = function( tree ) {
		
		tree.walk( paint_node )
	}
	
	// the id value is incremented with each view
	// node that is creatre
	var id = 0
	
	
	var paint_node = function( node ) {
		
		console.log('paint_node')
			
		var html = '<div id="node_box_{id}" class="node_box">'
		+ '<div id="node_{id}" class="node"></div>'
		+ '<div id="node_label_{id}" class="node_label"></div>'
		+ '</div>'
		
		var label = node.item.source
		console.log(label)
		
		// assign the id 
		html = html
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{id}', id )
		
		id++
	
		console.log(view.html_box)
		$( html ).appendTo( view.html_box )
		
	}


	
	
	return pub
}()



