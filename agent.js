/*

  # Collections: conscious agents - users and circles (groups - represented entities acting in their names)
  
  - Allowing agency for various types of agents

  - Question: How to bind agents (users and groups - circles, entities) to node-rhizome package?
	          - To set read and write rights / privileges, identifiable accounts are needed
	          - To count votes, information about who didn't vote is needed, too
	          - To integrate this package with an existing system
*/

// To generate a unique agent entity ID

export function agentId(entityType, // entityType - such as 'user_id', 'group_id', 'ngo_id', ...
                        id,			// unique identifier for entityType
                        service){   /* Unique service identifier (such as its domain)
                        
                        Some space for cross-platform imagination

	*/

  	return service+"-"+entityType+"_"+id;
}