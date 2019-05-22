
/* 'node-rhizome' package uses schemas defined in this file, to store data needed 
	to facilitate a variety of functions:

  - to validate data inputs when writing / reading data state to database
  - to allow for plurality of content versions

	It is applied on per data node basis, which is an identifiable data object (output of a function) */

import * from 'json-schema'; // http://json-schema.org/ format
import * from '../meteor-json-simple-schema/json-simple-schema.js'; // transpile from json-schema to simpl-schema
//
import SimpleSchema from 'simpl-schema';							// library, which validates inputs 
																	//(compatible with Meteor/MongoDB)

import {Text, Integer} from 'helpers/types';
import {validationSchema, validationSchemaWithEthereum} from 'helpers';
import lodash as _ from 'lodash';



/* A list of actions that create and modify state of data, defined within scope of 'node-rhizome' package
  (while rules of access to data are defined in scope of application) */

import {actions} from 'actions';



// To-do: Translate schema into JSON schema type

var node = {

  id: { type: String, unique: true }, 
  /* Data node identifier key, unique for each data node

  	 Idea: Cross-platform implementation (use of 'node-rhizome' package peer-to-peer or among connected services)
  	 When writing a new data node, 'node-rhizome' checks if generated id is unique with either:
  	 											- distributed tracker (DHT, see more below),
  	 											- global ledger (perhaps in a service such as Ethereum) */

  // Which data collection is stored ( <- NoSQL; in case of a relational SQL read as table_name and entry_id )
  service: String, 		// service name of local or external service provider
  type: String, 		// in case of an external service API (REST or GraphQL), this would equal data type API query returns
  document_id: Integer,	// 			 ... this equals data node identifier (or a unique composite of parameters)  
  						//		 	 ... but how would a change in API route be recognized? 
  						//				(!!! needs developers to implement most recent versions of APIs)
  						//			 ... but how would a change in data scheme at remote API point affect a node?

  // Current, main branch of data node (while multiple branches and translations can be contained within)
  main_branch_id: Integer,

  contains: {},

  eventsWithState: [actions.platform.create, actions.platform.update, actions.platform.publish,
  					actions.platform.close, actions.platform.remove],
  events: [actions.platform.unpublish, actions.platform.delete]
};

const node_recent_hash = validationSchemaWithEthereum('state');
node = _.merge({}, node, node_recent_hash);
// Hashed recent state of a data node, signifying that a data node has been modified
//(for example, with Git protocol this part of branch is called HEAD)

/* Ideation to support peer-to-peer completion and validaton of a data node:
  'node_recent_hash' and 'node_dht', contained in 'node' schema */

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

   'node-rhizome' defines, validates and in some cases, also stores relations:
  - data structure of 'node-rhizome' stores internal relations, contained within one distinct data node
  - external relations, among inter-related but distinct data nodes (using 'node-rhizome' data structure, or custom)
  - permitted agents (!!! write more about)

	-------------  (relation schema is also defined in graphql.relations.js, seperately)

	Relations change as time passes, and are tied to data node's state.
	All related data nodes, stored in 'node-rhizome', should have been processed with 'node-rhizome' package
*/

	const rhizome_contained_types = [
		'TRANSLATION', 	// translations of a data node
		'STEM', 	   	// where this content stemmed / evolved from
		'MERGED',  		// where a branch merged into another branch
		'ROOT',			// where a branch has roots
		'MAIN' 			// main branch of a certain data node
	];
	/* Relations among branches 'contained' within 'node-rhizome' data structure of one distinct data node,
	   have assigned one of the following types: */

	const rhizome_agent_types = [
		'AGENT' 		
	];
	/* Stores permitted agents - users (authorized by another service, anonymized, hidden under pseudonym, ...)
					  	  	  	 and groups (circle, organization, ...) */

	const rhizome_external_types = concat(rhizome_agent_types, rhizome_contained_types);
	/*
	If using functionalities of 'node-rhizome', but storing branches, translations (among other types)
    as a seperate data node, data types 'contained' in a rhizomatic data node apply here, too (as defined above)

    To enable validation of related data nodes, which are stored in (one or more) databases
    as individual data nodes, but are necessary for context

  - To map relations for reason of validating context of data node, relations defined within scope of application,
  	externally of 'node-rhizome', use a custom 'relation' descriptor:
   (developers must declare a non-conflicting name in relation to 'contained' and 'agent' relation_types)

	${CUSTOM_RELATION_TYPE_NAME} (relation with another interdependent data node, stored in database) */


/*	Rhizome storage schemes (!!! revisit - what if this data comes in from an external service) */

	var rhizome_related_by_type = {
	  relation: String, 	 		// type of relation (contained, external, agent)
	  contains: {related: rhizome_related_node},
	  related_count: Integer, 		// how many data nodes of this type are related to one state of data node
	  relation_hash: String 		// list of stored relations is hashed by type
	}

	var rhizome_related_node = {

	  nosql: {
	  	node_id: String,
	  	state_id: Integer,
	  	state_timestamp: Integer,

	  	// + validation vars are merged here
	  },

	  sql: { // This is storage schema, output comes out in same way as defined in 'nosql' schema found above
	  	state_id: String,
	  	draft_id: String,
	  	relation: String, // type of relation (contained, external, agent)

	  	related_node_id: String,
	  	related_state_id: Integer,
	  	related_state_timestamp: Integer,

	  	// + validation vars are merged here
	  }
	};

	rhizome_related_node.nosql = _.merge({}, rhizome_related_node.nosql, validationSchemaWithEthereum('state'));
	rhizome_related_node.sql = _.merge({}, rhizome_related_node.sql, validationSchemaWithEthereum('related_state'));



/* 	Type 'herstory' and / or 'history': enables 'statechain' to store an audit trail - history of changes to data
													   				  (disabled: only most recent state is stored) 

	   	Materialized data state is hashed for validity (in statechain_hash field)
	  - stores merkletree hash of recent and previous data state on a branch (not including drafts) 

	If Ethereum is configured with node-rhizome package, hashes are stored there for validation (as an immutable mirror) */

		import {fieldValue, fieldName, fieldDifference} from 'helpers/types';
		var stateFieldValue = _.merge({}, { 
			  state_id: Integer
			}, fieldValue);

		var state = { // stores manifested data states in a validatable format

		  sql: {
		  	node_id: String,
		  	contains: {data: stateFieldValue}
		  },
		  nosql: { /* State fields and values are added here, as schema depends upon collection */ },

		  language_code: String,

		  eventsWithState: [actions.platform.create, actions.platform.remove,
		  					 actions.platform.publish, actions.platform.unpublish],

		  events: [actions.platform.mutate,
		  		   actions.platform.request_translation, actions.platform.translate,
		  		   // actions.platform.reflect,
		  		   actions.platform.delete]
		};

		// ^ extend 'statechain' with 'validation'
		state = _.merge({}, state, validationSchemaWithEthereum('state'));

// Type 'multilingual': enables storing content in multiple languages, by adding translations to rhizome

		const translate_request = {

		  timestamp: Integer,

		  from_language_code: String,
		  to_language_code: String,

		  eventsWithState: [actions.platform.close, actions.platform.remove],
		  events: [actions.platform.create, actions.platform.delete]
		};

		const state_translate_request = _.merge({}, 
			{
			  sql: {
		  		state_id: Integer,
			  },
		  	  state_timestamp: Integer
		  	},
		  	translate_request
		);

/* 	Type 'draft': enables one draft per agent within a branch */

		var draftFieldValue = _.merge({}, { 
			  draft_id: Integer
			}, fieldValue);

		const draft = { // recent draft, to be put in statechain

		  sql: {
		  	node_id: String,
		  	contains: {data: draftFieldValue}
		  },
		  nosql: { /* draft fields and values are returned dynamicly, as schema depends upon collection type */ },

		  language_code: String,
		  machine_translation: String, // provider of machine translation, if any

		  eventsWithState: [actions.platform.create, actions.platform.mutate],
		  events: [actions.platform.delete]
		};

		const draft_translate_request = _.merge({}, 
			{
			  sql: {
		  		state_id: Integer,
			  },
		  	  state_timestamp: Integer
		  	},
		  	translate_request
		);

/* Type 'eventsourcing': enables storing signed actions, which are related to a state in a branch, as events

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

		  timestamp: Integer,

		  // How should this be carried out?
		  action: String,		// which action was performed

		  // SQL - Serialized changed fields and data ... (+, -, ~)
		  contains: {
			added: eventFieldValue, 		 // array of fields and values which were removed (modified later on)
			modified: eventFieldName, 	 // array of fields and difference patch of their modified data
			removed: eventFieldDifference, // array of names of fields which were added	  	
		  },

		  eventchain_hash: String, /* Computing this hash takes statechain_hash of previous manifested state as root 
		  							 (in this branch, or a statechain_hash of state on a branch where it stemmed from),
		  							  and includes events up to and including recent one */

		  //eventsWithState: [],

		  events: [actions.platform.create,
		  		   actions.platform.strip, // keep events and hashes, but delete 'added', 'modified', 'removed' data
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