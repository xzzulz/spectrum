var edit = {}


edit.source = ''
+ 'one\n'
+ 'two three\n'
+ 'one four\n'
+ '	five\n'
+ '	six\n'
+ '	two four\n'
+ 'three\n';



edit.ini = function() {
	
	// set some source code
	$('#ink_box').html(  ini.source  );
	
	// handle key press
	$('#ink_box').keydown( edit.keypress )
	
}



// if tab is pressed, prevent jumping to next
// element. instead, insert tab character
edit.keypress = function( e ) {
	
	
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





edit.action = function( e ) {
	
	console.log('action')
	
	getCaretPosition()	
	

}


/*
edit.nl_to_div = function( text ) {

	var rgx = /(.*)\n/g
	var from, to, res
	
	while(  res = rgx.exec( text )  ) {
		from = res.index	// first char
		to = rgx.lastIndex	// char after last char

		prev = text.substring( 0, from )
		post = text.substring( to )

		text = prev + '<div>' + res[1] + '</div>' + post

		rgx.lastIndex += 10
		
	}
	
	return text
}
*/
