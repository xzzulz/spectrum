

var o_group = function() {
	
	// public space
	var pub = {}
	
	pub.new = function() {
	
		var group = {}
		
		group.type = "group"
				
		
		group.id = 'g' + id++
		
		// namespace for things related to the 
		// original source code
		group.source = {}
		
		// original pos in source
		// line and char index (including)
		group.source.line_from
		group.source.from
		
		group.source.line_to
		group.source.to
		
		
		return group
	
	}
	
	var id = 0

	return pub
	
}()
