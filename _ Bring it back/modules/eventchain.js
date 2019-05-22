import {actions} from 'actions';
/*
	
	# Collection: Nodechain
	 (validatable, blockchain alike, merkletree sequence - unbreakable chain of hashed changes to data state)

	- Challenge: Mirroring hashes on an independent, trustworthy medium (such as a blockchain - Ethereum)

*/

	var nodechain = {};

	nodechain.schema = {
	  hash: String, // hash of changes to data state (within current branch)
	};
	nodechain.node_rhizome.actions = {

	};
/*

   [X] current idea is to run an Ethereum light node (in this case node is a blockchain virtual computer, running locally)
   	   and store hashed data there (it is not free!):
   	   - each time a change is made
   	   - randomly, within a scope / range / interval
   	   - at a fixed interval
   	   ... where interval can be based on time or on a number of changes

	This collection (or table in SQL) is to be influenced by the following decisions
								(currently these are imaginary scenarios - "fantasms"):

	- integration with blockchain (where one block consists of multiple transactions - events, which change state of data)
	- integration with a different peer-to-peer transmission interface
	  (blockchain already has a consensus protocol on level of incoming blocks, put in a sequence, 
	   thus managing conflict resolution on the level of protocol - refactoring what is voted out as invalid data)

	To make notice of another few possibilities, conflicting with the above one chain of events, 
	for understanding implications:
	
	- structure of data nodes, which is versioned into separate flows of content co-evolution (rhizomatic)
	- parallelization - not every server / node.js maintains all data 
			- data sharding,
			- reducing data storage space and querying load on node.js,
			- keeping data privately kept
	- preserving ability to validate data with merkletree
	- preserving relations with other data nodes

	The above implies that merkletree hashes might be instead limited to a data node, 
	possibly storing seed hashes (initial hashes, before any changes) of data nodes on Ethereum.

    Question: Where and how to bind nodechain ...
    		  - on level of data node, 	<- branches or (sub)versions are undeniable (but can be avoided by copying a data node)
    		  - or on level of branch?	<- branches can be easily detached (unless related data influence each other's hashes)

	Implications and potential dangers will receive (theoretical) reflection here:

	- ...

Questions:

	- Is there an alternative package providing similar benefits?
	- With blockchain, what is the rationale behind having the merkletree chain on level of all data nodes?

*/

export {eventchain};