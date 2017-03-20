
/* 'node-rhizome' package uses schemas defined in this file, to facilitate a variety of functions,
	among them to validate data inputs before storing data state in database.

	It is applied on per data node basis, which is an identifiable data object (output of a function) */

import * from 'json-schema'; // http://json-schema.org/ format
import * from '../meteor-json-simple-schema/json-simple-schema.js'; // transpile from json-schema to simpl-schema
//
import SimpleSchema from 'simpl-schema';							// library, which validates inputs 
																	//(compatible with Meteor/MongoDB)

import {Text, Integer} from 'helpers/types';
import lodash as _ from 'lodash';



/* A list of actions that create and modify state of data, defined within scope of 'node-rhizome' package
  (while rules of access to data are defined in scope of application) */

import {actions} from 'actions';


var node = {

  id: { type: String, unique: true }, 
  /* Data node identifier key, unique for each data node

  	 Cross-platform implementation (use of 'node-rhizome' package peer-to-peer or among connected services)
  	 When writing a new data node, 'node-rhizome' checks if generated id is unique with distributed tracker
  	 																				  - DHT, see more below */

  // Which data collection is stored ( <- NoSQL; in case of a relational SQL read as table_name and entry_id )
  type: String, 		// in case of an external service API (REST or GraphQL), this equals call
  document_id: Integer,	// ... external service API: this equals id param (or composite of params)  

  // Current, main branch of data node (while multiple branches and translations can be contained)
  main_branch_id: Integer,

  eventsWithState: [actions.platform.create, actions.platform.close, actions.platform.remove],
  events: [actions.platform.delete]
};

/* Ideation to support peer-to-peer completion and validaton of a data node:
  'node_recent_hash' and 'node_dht', contained in 'node' schema */

	const node_recent_hash = {	// Hashed recent state of a data node, signifying that a data node has been modified
								//(for example, with Git protocol this part of branch is called HEAD)

		timestamp: String,
		hash: String
	}

	node = _.merge({}, node, node_recent_hash);

	const node_dht = {

	/*	In case this data node is to be distributed among various services
		DHT - "distributed sloppy hash table" (DHT) for storing peer contact information for "trackerless" torrents. 
		In effect, each peer becomes a tracker. http://bittorrent.org/beps/bep_0005.html 

		Typically stores a list of data providers and a way to access each - ${host}:${port} 
		https://www.npmjs.com/search?q=dht */
	};

/* 	
	Type 'rhizome': data node's state of mapped relations within plurality of co-evolving contents
		 		  - data node's context can be as important as its state,
		 		    hence relations can be included in validation (related data nodes need to be stored 'node-rhizome')

   'node-rhizome' defines:
  - relations, 'contained' within one distinct data node (data structure, kept internally of 'node-rhizome', only)
  -'external' relations, among inter-related but distinct data nodes

	-------------  (relation schema is also defined in graphql.relations.js, seperately)
*/

	const rhizome_sql = { // relations change as time passes, and are tied to data node's state

	  node_id: String,
	  state_id: Integer
	};

	const rhizome_related_node = {

	  related_node_id: String,
	  related_state_id: Integer,
	  related_hash: String
	};

	const rhizome_related_contained = {
	  /*
		All relations, 'contained' within one distinct data node,
		have one of the following types of rhizomatic relations:

		TRANSLATION (translations of a data node)
		STEM (where this content stemmed / evolved from))
		MERGED (where a branch merged into another branch)
		ROOT (where a branch has roots)
		MAIN (versioning and branches - main branch of a certain data point);
  	  */
	  relation: String, 	 	// type of relation
	  related_count: Integer 	// how many data nodes of this type are related to one state of data node
	  contains: {related: rhizome_related_node}
  	}

	const rhizome_related_external = rhizome_related_contained;
	  /*
		To enable validation of related, interdependent data nodes (which can differ among states):

	  - If using functionalities of 'node-rhizome', but storing branches, translations (among other types)
	    as a seperate data node, 'contained' types apply here, too, as defined above

	  - To map relations for reason of validation, relations defined within scope of application,
	  	externally of 'node-rhizome', use a custom 'relation' descriptor, non-conflicting with 'contained':

		${CUSTOM_RELATION_TYPE} (relation with another interdependent data node, stored in database)
  	  */

	const rhizome_relation_nosql = {
	  related: ''; // list of related nodes, within each stored type
	}

// Type 'multilingual': enables storing content in multiple languages, by adding translations to rhizome

	const translateRequest = {

	  from_language_code: String,
	  to_language_code: String,

	  eventsWithState: [actions.platform.create, actions.platform.close, actions.platform.remove],
	  events: [actions.platform.delete]
	};

/* 	Type 'herstory' and / or 'history': enables 'statechain' to store an audit trail - history of changes to data
													   				  (disabled: only most recent state is stored) 

	   	Materialized data state is hashed for validity (in statechain_hash field)
	  - stores merkletree of hashed differences in recent and previous data state on current branch (not including drafts) 

	If Ethereum is configured with node-rhizome package, hashes are stored there for validation (as an immutable mirror) */

		import {fieldValue, fieldName, fieldDifference} from 'helpers/types';
		var stateFieldValue = _.merge({}, { 
			  state_id: Integer,
			  table_name: String
			}, fieldValue);

		const state = { // stores manifested data states in a validatable format

		  sql: {
		  	node_id: String,
		  	contains: {data: stateFieldValue} /* Also stores:
		  												
			
		  	*/
		  },
		  nosql: { 

		  /* state fields and values are added here, as schema depends upon collection */ },

		  language_code: String,
		  machine_translation: String, // provider of machine translation, if any

		  eventsWithState: [actions.platform.create, actions.platform.remove,
		  					 actions.platform.publish, actions.platform.unpublish],

		  events: [actions.platform.mutate,
		  		   actions.platform.request_translation, actions.platform.translate,
		  		   actions.platform.reflect,
		  		   actions.platform.delete]
		};

		// ^ extend 'statechain' with 'validation'

		const validation = {
		  statechain_hash: String,
		  statechain_hash_ethereum: String

		  /* Computing this hash takes as seed hash a previous statechain_hash
		 	(in this branch, or a statechain_hash of state on a branch where it was stemmed from),
		  	 optionally storing it to Ethereum */
		}

/* 	Type 'draft': enables one draft per branch */

		var draftFieldValue = _.merge({}, { 
			  draft_id: Integer,
			  table_name: String
			}, fieldValue);

		const draft = { // recent draft, to be put in statechain

		  sql: {
		  	node_id: String,
		  	contains: {data: stateFieldValue}
		  },
		  nosql: { /* draft fields and values are added here, as schema depends upon collection */ },

		  language_code: String,
		  machine_translation: String, // provider of machine translation, if any

		  eventsWithState: [actions.platform.create, actions.platform.mutate],
		  events: [actions.platform.delete]
		};

/* Type 'eventsourcing': enables storing signed actions, which are related to a branch, as events

   	Events in eventsource are hashed for validity (in eventchain_hash field)
  - events in between a sequence of two materialized states can be removed keeping statechain_hash validation (to reduce storage)

    Question: How could datasets related to a data node (not just the contents) leave a trace in 'validation'? */
		
		var eventFieldValue = _.merge({}, { 
			  event_id: Integer
			}, fieldValue);

		var eventFieldName = _.merge({}, { 
			  event_id: Integer
			}, fieldName);

		var eventFieldDifference = _.merge({}, { 
			  event_id: Integer
			}, fieldDifference);

		const eventsource = {

		  sql: {
		  	node_id: String,
		  	state_id: Integer,
		  },

		  // How should this be carried out?
		  action: String,		// which action was performed

		  // SQL - Serialized changed fields and data ... (+, -, ~)
		  contains: {event
			  added: eventFieldValue, 		 // array of fields and values which were removed (modified later on)
			  modified: eventFieldName, 	 // array of fields and difference patch of their modified data
			  removed: eventFieldDifference, // array of names of fields which were added	  	
		  },

		  eventchain_hash: String, /* Computing this hash takes statechain_hash of previous manifested state as root 
		  							 (in this branch, or a statechain_hash of state on a branch where it stemmed from),
		  							  and includes events up to and including recent one */

		  eventsWithState: [actions.platform.create],

		  events: [actions.platform.strip, // keep events and hashes, but delete 'added', 'modified', 'removed' data
		  		   actions.platform.clear_hashed, 	// delete events data from those states, which are hashed
		  		   actions.platform.clear_all]		// delete all events from specific node's 'eventsource'
		};

		const signed = {

		};

/* Imagining extending 'signed' to type 'contributors': aggregating a list of agentId's, contributing to a materialized state
							    								- can be built by taking in 'eventsource' data (if it's there)

	Question: How much data to aggregate along with one materialized state? 
   			- one state; one branch; across N branches; whole registered stem history) */

// Type 'tree': data point, as nested within a tree structure (relations: hyponomy / hypernymy, synonyms / antonyms)

	/*const tree_synonym = { 

		synonym_node_id: Integer,
		synonym_state_id: Integer, // pointer to node state, where branch was stemmed

		eventsWithState: [actions.platform.create, actions.platform.remove],
		events: [actions.platform.delete]
	};

	const tree_hypernym = { // Where a node is categorized within a specific tree, in relation to others

		hypernym_node_id: Integer,
		hypernym_state_id: Integer, // pointer to node state, where branch was stemmed

		actions: [actions.platform.create, actions.platform.remove],
		events: [actions.platform.delete]
	}*/

	// const synset = {} 	   // Group of synonyms (eg. WordNet uses this structure - see wordnet.princeton.edu)
	// const tree_antonym = {} // Node with an opposite meaning in relation to another

/*
	# 	Imaginary types - see design-questions.js

   		'seen' - enables recording who has given attention to data node and when
   		'reports': enables reporting inappropriate contents, falsifying invalid data
*/