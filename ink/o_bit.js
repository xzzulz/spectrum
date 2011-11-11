

var o_bit = function() {
	
	// public space
	var pub = {}
	
	pub.new = function() {
	
		var bit = {}
		
		bit.type = "bit"
		
		bit.id = 'b' + id++
		
		// namespace for things related to the 
		// original source code
		bit.source = {}
		
		// line number from source code
		// zero base
		bit.source.line

		bit.source.from
		bit.source.to
		
		
		return bit
	
	}
	
	var id = 0

	return pub
	
}()
