var tokenizer = function() {
	
	
	var pub = {}
		
	
	pub.tokenize = function( par_lines ) {
		
		lines = par_lines
		walk_lines()
			
		return( tokens_tree )
	}
	
	
	
	// regexs
	var rgx_tokens = /^\t+|one|two|three|four|five|six/g
	var rgx_invalid_spacing = /[^\s\n]/
	var rgx_valid_ending = /^\s*(\:\:.*)?$/

	
	// source lines list
	var lines = null
	
	
	// tokens tree
	// example:
	// tokens_tree.lines[ 24 ].tokens[ 2 ] = 'one'
	var tokens_tree = {}
	
	// lines list
	tokens_tree.lines = []
	
	
	
	
	
	// walk the lines list, and call breakTokens
	// on each one
	var walk_lines = function() {
		
				
		// for each source line
		for( i=0; i<lines.length; i++ ) {				
			
			// ignore empty or comment lines
			if( is_not_code( lines[ i ] ) ) 
				continue
			
			// create a line in the token tree
			tokens_tree.lines[ i ] = {}
			tokens_tree.lines[ i ].tokens = []
			// line number from source
			tokens_tree.lines[ i ].sourceLine = i
			
			// tokenize the line
			break_tokens( lines[i], i )
		}
		
	}
	
	
	
	// check if a line can be ignored
	var is_not_code = function( line ) {
		
		if( rgx_valid_ending.test( line ) ) 
			return true
		else 
			return false
	}
	
	
	
	
	
	
	
	//
	var match, from, search
	//
	var break_tokens = function( line, line_number ) {
				
		from = 0
		search = true
		while( search ) {
			
			match = rgx_tokens.exec( line )
			
			// check spacing for invalid syntax.
			// between previous point, and current token match
			// position, or end of line
			if( match )
				check_spacing( match, from, line, line_number )
			else
				check_rest( line_number, from )
				
			// update from
			from = rgx_tokens.lastIndex

			
			if( match )
				add_token( match[0], line_number )
			else
				search = false
		}
		
	}



	// check spacing characters between tokens, for
	// invalid syntax
	var spacing
	//
	var check_spacing = function( match, from, line, line_number ) {
		
		// check spacing for invalid syntax
		// between previous position and token found
		spacing = line.substring( from, match.index )

		// test for invalid spacing syntax
		if( rgx_invalid_spacing.test( spacing ) ) {
			// invalid syntax found
			console.log( 'invalid syntax at line: ' + line_number )
			console.log( 'syntax: ' + spacing )
		}		
		
	}
	


	var rest
	// check the ending part of the line
	// for valid syntax
	var check_rest = function( line_number, from ) {
		
		rest = lines[ line_number ].substring( from )
		
		// return if valid line ending
		if( rgx_valid_ending.test( rest ) ) 
			return
		
		// else error
		console.log( 'invalid syntax at line: ' + line_number )
		console.log( 'syntax: ' + rest )	
		
	}




	// add token
	var add_token = function( token, line_number ) {
		
		tokens_tree.lines[ line_number ].tokens.push( token )
	}

	
	
	return pub
	
}()


