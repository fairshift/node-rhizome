/*

	# node-rhizome: Package to augment existing data collections with a list of general data structures

	  - additional, generalized data structures (and functionalities, to be found in another folder !!! revise)
	  - it could be using a NoSQL or a relational SQL database

	  Challenge: fetching related data nodes (schema and GraphQL mapping !!! revise)

	  Challenges expected with NoSQL:
	  - read / write permissions to various parts of data scheme,
	  - searching through database,
	  - maintaining schema and data structure consistency

	  SQL only for now  with Knex SQL connector (not to overwhelm with amount of work with MongoDB and ElasticSearch),
	  although this package uses SimpleSchema, a MongoDB compatible package.

!!!	  On second thought: currently, there is a node-rhizome schema design problem when augmenting MongoDB collections,
	  					 as they can be an array of arrays. With SQL tables this problem doesn't exist.

http://bit.ly/japanese-knotweed-rhizome
https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Plant_nodes_c.jpg/200px-Plant_nodes_c.jpg */

import {schema} from 'schema';
import {helpers} from 'helpers';

import {agentId} from 'agent';

/*

  # Collections: conscious agents - users and circles (groups - represented entities acting in their names)
  
  - Allowing agency (ability to perform actions) for various types of user and group accounts

    Function: agentId() takes in three parameters ...
  - entityType - such as 'user_id', 'group_id', 'pseudonym_id', ...
  - id - unique identifier for entityType
  - service - unique service identifier (such as its domain)

*/

import Rhizome from 'rhizome';


/* 

	# Function list:

	Rhizome.get({node_id,
				 collection,
				 document_id,
				 languages,
				 features,
				 customSchema},
				 knex);

	Rhizome.parseCurrent({node_current, languages});

	Rhizome.update( !!! revise )

  ( ? searchRhizome )


	# Output: above functions return following (sub)structures (refer to schema.js for definitions of specific substructures)

	  node-rhizome: {
	  	node,
	  	statechain,
	  	draft,
	  	translate,
	  	eventsource,
	  	branch_root,
	  	branch_merge,
	  	tree_hypernym,
	  	tree_synset,
	  }

*/