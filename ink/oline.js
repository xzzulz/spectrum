

var oline = function() {
	
	// public space
	var pub = {}
	
	pub.new = function( number, source ) {
	
		var lin = {}
		
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



	return pub
	
}()
