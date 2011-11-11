

var o_line = function() {
	
	// public space
	var pub = {}
	
	pub.new = function( number, source ) {
	
		var lin = {}
		
		lin.type = "line"
		
		lin.id = id++
		
		// line number from source code
		// zero base
		lin.number = number

		lin.source = source
		
		// character positions of line limits
		// in original source line
		lin.from = 0
		lin.to = source.length - 1
		
		return lin
	
	}

	var id = 0

	return pub
	
}()
