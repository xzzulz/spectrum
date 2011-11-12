

var o_blok = function() {
	
	// public space
	var pub = {}
	
	pub.new = function() {
	
		var blok = {}
		
		blok.type = "blok"
				
		
		blok.id = 'b' + id++
		
		// tabs lvl
		blok.tabs = 0
		
		// namespace for things related to the 
		// original source code
		blok.source = {}
		
		// original pos in source
		// line and char index (including)
		blok.source.line_from

		blok.source.line_to

		
		
		return blok
	
	}
	
	var id = 0

	return pub
	
}()
