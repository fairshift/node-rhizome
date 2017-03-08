/*

	# node-rhizome: Package to augment existing data collections

	  - additional, generalized data structures (and functionalities, to be found in another folder !!!)
	  - it could be using a NoSQL or a relational SQL database

	  Challenges expected with NoSQL:
	  - read / write permissions to various parts of data structure,
	  - searching through data structure,
	  - maintaining schema and data structure consistency

	  SQL only for now  with Knex SQL connector (not to overwhelm with amount of work with MongoDB and ElasticSearch),
	  although this package uses SimpleSchema, a MongoDB compatible package.

!!!	  On second thought: currently, there is a node-rhizome schema design problem when augmenting MongoDB collections,
	  					 as they can be an array of arrays. With SQL tables this problem doesn't exist.

https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Plant_nodes_c.jpg/200px-Plant_nodes_c.jpg */

import {schema} from 'schema';
import {helpers} from 'helpers';

import {agentId} from 'agent';

/*

  # Collections: conscious agents - users and circles (groups - represented entities acting in their names)
  
  - Allowing agency (ability to perform actions) for various types of user and group accounts

    Function: agentId() takes in three parameters ...
  - entityType - such as 'user_id', 'group_id', 'ngo_id', ...
  - id - unique identifier for entityType
  - service - unique service identifier (such as its domain)

*/

import {getRhizome} from 'getRhizome';
import {updateRhizome} from 'updateRhizome';
import {search} from 'search';

/* 

	# Function list:

	- getRhizome({data_provider,
				  collection,
				  document_id,
				  branch_id,
				  languages,
				  cascade_level, //how many levels of related nodes to get? (default: 1)
				  agentId,
				  config,
				  datasets});

	- updateRhizome( !!! revisit )

	- search( !!! revisit )

	# Function: getRhizome({data_provider, collection, document_id, branch_id},
							agentId,
							rhizome_config,
							languages,
							datasets = null)


	  Output: above functions return following (sub)structures (refer to schema.js for field definitions)
										   			 (if agentId has sufficient access rights/privileges)

	  {data_provider}_{collection}_{entry_id}: {
	  	stem,
	  	branch {
	  	  {id}: {
			... 	// see 'branch' definition
			state   // recent manifested state, in user's language(s - currently just one)
			rooted,
			merged,
			{dataset}, // additional datasets
			{dataset},
			...
		  }
	  	},
	    {dataset}, // related datasets
	    {dataset},
	    ...
	  },
	  ...,

	  related: { // related data nodes
		{data_provider}_{collection}_{entry_id}: {
		  // structure similar to the above
		},
		...
	  }

*/