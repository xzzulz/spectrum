//
// tree.js
//
// tree data structure in javascript
//

var blue = {}

blue.tree = function() {
	
	
	var pub = {}
	
	
	

	// creates a new node
	pub.node = function( item ) {
		
		var nod = make.node( item)		
		return nod
	}
	
	
	// namespace
	var make = {}
	

	// create a new node
	make.node = function( item ) {
		// node
		var nod = {}
		
		// item
		// "payload" of the node
		// assign the provided item property
		nod.item = null
		if( item )
			nod.item = item
		
		// top node
		nod.top = null

		// prev 
		nod.prev = null
		
		// next 
		nod.next = null
		
		// namespace for sub nodes
		nod.sub = make.sub( nod )
		
		// removes the node form its tree.
		// returns the node.
		nod.rip = function() {
			
			if( ! nod.top ) return nod
			
			if( nod.next )
				nod.next.prev = nod.prev
			if( nod.prev )
				nod.prev.next = nod.next
							
			if( nod.top.sub.last == nod	)
				nod.top.sub.last = nod.prev

			if( nod.top.sub.first == nod )
				nod.top.sub.first = nod.next
			
			nod.top.sub.n--
			
			nod.top = null
			nod.next = null
			nod.prev = null
						
			return nod
		}
		
		
		// executes function func on all the tree
		// nodes below (recursively)
		nod.walk = function( do_on_each ) {
			
			var node = nod.sub.first
			
			while( node ) {
				do_on_each( node )
				
				if( node.sub.n > 0 )
					node.walk( do_on_each )
					
				node = node.next
			}
			
		}


		// returns an array with references to all nodes in tree
		nod.flat = function() {
			
			var flat = []
			
			var grab = function( node ) {
				flat.push( node )
			}
			nod.walk( grab )
			
			return flat
		}


		// places nod as prev of nex
		// nex must be sub of another.
		// returns the inserted node
		nod.put_before_of = function( nex ) {
			
			if( ! nex.top )
				throw "parameter node is not a sub node in a tree"
			
			nod.next = nex
			nod.prev = nex.prev
			nod.top = nex.top
			
			nex.prev.next = nod
			nex.prev = nod
						
			if(nex.top.sub.first == nex)
				nex.top.sub.first = nod
				
			nex.top.sub.n++
			
			return nod
		}
		
		
		return nod
	}
	
	
	
	
	// namespace for sub operations
	make.sub = function( nod ) {
		
		var pub = {}
		
		// the owner node of this
		// "sub" namespace
		pub.nod = nod
		
		// first and last sub
		pub.first = null
		pub.last = null
		
		// number of sub nodes
		pub.n = 0
		
		// get subnode at index position (0 index)
		pub.at = function( index ) {
					
			var pik,i
			
			if( index > pub.n - 1 )
				return null
	
			pik = pub.first
			for( i=0; i<index; i++ )
				pik = pik.next
			
			return pik
		}
		
		
		
		// add sub node at last position
		// returns the added node
		pub.add = function( sub ) {
									
			if( pub.last ) {
				sub.prev = pub.last
				pub.last.next = sub
				pub.last = sub
			} else {
				pub.first = sub
				pub.last = sub
			}
			
			sub.top = pub.nod
			
			pub.n++	
			return sub
		}
		
		
		
		// insert sub node at index position
		// returns the inserted node		
		pub.insert = function( sub, index ) {
			var pik
			
			// validate index given
			if( index < 0 )
				throw "node insert failed, invalid index"
			if( index > pub.n - 1 )
				throw "node insert failed, given index exceeds valid places"
				
			pik = pub.at( index )
			
			sub.prev = pik.prev
			sub.next = pik
			pik.prev.next = sub
			pik.prev = sub

			sub.top = pub.nod
			
			pub.n++
			
			return sub	
		}	
		
		
		// executes function "func" on each direct 
		// sub node (not recursive)
		pub.each = function( do_on_each ) {
			
			var node = pub.first
			while( node ) {
				do_on_each( node )
				node = node.next
			}
			
		}
		
		
		return pub
		
	}


	
	return pub 
	
}()












