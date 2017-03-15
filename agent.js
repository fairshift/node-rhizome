/*

  # Collections: conscious agents - users and circles (groups - represented entities acting in their names)
  
  - Allowing agency for various types of agents

  - Question: How to bind agents (users and groups - circles, entities) to node-rhizome package?
	          - To set read and write rights / privileges, identifiable accounts are needed
	          - To count votes, information about who didn't vote is needed, too
	          - To integrate this package with an existing system
*/

// To generate a unique agent ID, with ability to get a list of inputs back after it's been generated

export function agentId(collection, // accounts collection name, such as 'user', 'group', 'circle', 'user_pseudonym', ...
                        id,			// unique identifier of user within accounts collection
                        service){   /* Unique service identifier (such as protocol&domain)
                        
                        Some space for cross-platform imagination

	*/

  	return "{"+service+"}-{"+entityType+"}-{"+id+"}";
}