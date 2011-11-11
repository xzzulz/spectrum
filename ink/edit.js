// micro text editor
var edit = function() {
	
	// public
	var pub = {}



	var source = ''
	+ 'one\n'
	+ 'two three\n'
	+ 'one four\n'
	+ '	five\n'
	+ '	six\n'
	+ '	two four\n'
	+ 'three\n';



	pub.ini = function() {
		
		// set some source code
		$('#ink_box').html(  source  );
		
		// handle key press
		$('#ink_box').keydown( keypress )
		
		document.execCommand("enableObjectResizing", false, false);
		
		
		getViewSize()
		resize_panels()
	}

	
	var view = { width: 0, height: 0 }
	

	var getViewSize = function() {
		
		view.width = $( window ).width();
		view.height = $( window ).height();
		
	}


	var resize_panels = function() {
		
		var panel_width = Math.round( (view.width - 90 - 120 ) / 2 )
		
		$('#ink_box').css( 'width', panel_width - 20  )
		$('#bits_box').css( 'width', panel_width  )
		
				
		var panel_height = Math.round( view.height - 60 )
		
		$('#ink_box').css( 'height', panel_height - 20  )
		$('#bits_box').css( 'height', panel_height  )
		
	}


	// if tab is pressed, prevent jumping to next
	// element. instead, insert tab character
	var keypress = function( e ) {
		
		
		if( e.keyCode != 9 ) return
			
		e.preventDefault()
		
		var sel = window.getSelection()	

		var offset = sel.anchorOffset
		var htmlnode = sel.anchorNode
		var text = htmlnode.textContent
		var prev = text.substring(0,offset)
		var post = text.substring(offset)
		htmlnode.textContent = prev + '\t' + post
		
		var range = document.createRange();
		range.setStart(htmlnode, offset+1);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
		
	}
	
	
	
	return pub
}()

