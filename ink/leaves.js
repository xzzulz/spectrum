


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
		
		if( node.item.type == 'line' ) {	
			// node is a line
			var html = make_html_line_node( node )
		
		}else if( node.item.type == 'blok' ) {	
			// node is a blok
			var html = make_html_blok_node( node )

		}else if( node.item.type == 'group' ) {	
			// node is a group
			var html = make_html_group_node( node )
		
		}else if( node.item.type == 'bit' ) {
			// node is a bit
			html = make_html_bit_node( node )
				
		}else if( node.item.type == 'error' ) {
			// node is a bit
			html = make_html_bit_error_node( node )
				
		}
		
		

		
		if( node.top.item.type == 'root' ) {
			// append to root node
			$( html ).appendTo( view.html_box )
			
		} else {

			// append to top line node
			var top_node_id = '#sub_' + node.top.item.id 
			
			$( html ).appendTo( $( top_node_id ) )
		}
		
		
	}




	var make_html_blok_node = function( node ) {
		
		var id = node.item.id
		var width = '110'
			
		// html for line node
		var html = ''
		+ '<div id="box_{id}" class="line_box">'
		+ 	'<div id="node_{id}" class="line_node">'
		+ 		'<div id="node_label_{id}" class="line_node_label">blok</div>'
		+ 	'</div>'
		+	'<div class="line_weight" style="width:{width}px"></div>'
		+ 	'<div id="sub_{id}" class="sub_box"></div>'
		+ '</div>'
		
		// assign the id and label
		html = html
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{width}', width )
			
		return html	
	}




	var make_html_group_node = function( node ) {
		
		var id = node.item.id
		var width = '110'
			
		// html for line node
		var html = ''
		+ '<div id="box_{id}" class="line_box">'
		+ 	'<div id="node_{id}" class="line_node">'
		+ 		'<div id="node_label_{id}" class="line_node_label">grup</div>'
		+ 	'</div>'
		+	'<div class="line_weight" style="width:{width}px"></div>'
		+ 	'<div id="sub_{id}" class="sub_box"></div>'
		+ '</div>'
		
		// assign the id and label
		html = html
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{width}', width )
			
		return html	
	}







	var make_html_line_node = function( node ) {
		
		var label = node.item.number + 1
		var id = node.item.id
		var width = '110'
		
			
		// html for line node
		var html = ''
		+ '<div id="box_{id}" class="line_box">'
		+ 	'<div id="node_{id}" class="line_node">'
		+ 		'<div id="node_label_{id}" class="line_node_label">{label}</div>'
		+ 	'</div>'
		+	'<div class="line_weight" style="width:{width}px"></div>'
		+ 	'<div id="sub_{id}" class="sub_box"></div>'
		+ '</div>'
		
		// assign the id and label
		html = html
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{label}', label )
			.replace( '{width}', width )
			
		return html	
	}




	var make_html_bit_node = function( node ) {
		
		var bit = node.item.bit
		var id = node.item.id

		// html for bit node
		var html = ''
		+ '<div id="box_{id}" class="bit_box">'
		+ 	'<div id="node_{id}" class="bit">'
		+ 		'<div id="node_label_{id}" class="bit_label">{bit}</div>'
		+ 	'</div>'
		+ '</div>'
		
		// assign the id and label
		html = html
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{bit}', bit )
			
		return html	
	}



	var make_html_bit_error_node = function( node ) {
		
		var bit = 'error'
		var id = node.item.id

		// html for bit error node
		var html = ''
		+ '<div id="box_{id}" class="bit_box">'
		+ 	'<div id="node_{id}" class="bit_error">'
		+ 		'<div id="node_label_{id}" class="bit_label">{bit}</div>'
		+ 	'</div>'
		+ '</div>'

		
		// assign the id and label
		html = html
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{id}', id )
			.replace( '{bit}', bit )
			
		return html	
	}


	
	return pub
}()



