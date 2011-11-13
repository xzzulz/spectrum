

var o_grup = function() {
	
	// public space
	var pub = {}
	
	pub.new = function() {
	
		var grup = {}
		
		grup.type = "grup"
				
		
		grup.id = 'g' + id++
		
		// namespace for things related to the 
		// original source code
		grup.source = {}
		
		// original pos in source
		// line and char index (including)
		grup.source.line_from
		grup.source.from
		
		grup.source.line_to
		grup.source.to
		
		
		return bit
	
	}
	
	var id = 0

	return pub
	
}()
