
/* 'node-rhizome' package for Node.js uses schemas defined in this file for storing data needed 
	to facilitate a variety of functions:

  - to validate data inputs when writing / reading data state to / from data sources
  - to allow for plurality of content versions

	It is applied on per data node basis, which is an identifiable data object (output of a function) */

import * from 'json-schema'; // http://json-schema.org/ format
import * from '../meteor-json-simple-schema/json-simple-schema.js'; // transpile from json-schema to simpl-schema
//
import SimpleSchema from 'simpl-schema';							// library, which validates inputs 
																	//(compatible with Meteor/MongoDB)
// Translate simpl-schema types into JSON schema type? (!!!)



import {Text, Integer} from 'helpers/types';
import {validationSchema, validationSchemaWithEthereum} from 'helpers/types';
import lodash as _ from 'lodash';



/* A list of actions that create and modify state of data, defined within scope of 'node-rhizome' package
  (while rules of access to data are defined in scope of application) */

import {actions} from 'actions';



var node = {

  id: { type: String, unique: true }, // Data node identifier key, unique for each data node

  /* Idea for cross-platform implementation (networked use of 'node-rhizome', peer-to-peer or among services)
  	 When adding a data node to 'node-rhizome', generated 'id' should be checked if it is unique:
   - in local database
   - with a global, immutable storage medium (data nodes, which have been registered there - !!! platform choice)
   - in peer-to-peer neighbourhood
   	(where proximity of online data nodes with equal ID defines timely probability of discovery,
   					  therefore it should be possible to modify ID without disabling validation)

   	 DHT - "distributed sloppy hash table" for storing peer contact information for "trackerless" torrents. 
			In effect, each peer becomes a tracker. http://bittorrent.org/beps/bep_0005.html 

			Typically stores a list of data providers and a way to access each - ${host}:${port} 
			https://www.npmjs.com/search?q=dht */

  // Which data node is augmented with 'node-rhizome' - and where did it come from?
  source: [], // Source type and route to access data (data node identifier, or a unique composite of parameters)

  /* Below set of source schemas can be found in 'schema/sources' folder:

  	 Sources, available locally:
   - SQL databases: 'table' and 'entry' with its own 'id' (incremental)
   - NoSQL databases: 'collection' or 'type', and 'document' which has its own 'id' (non-incremental) 
   - Classes, functions (also packages): 'objects' and 'function' names with distinct 'inputs'
   - Files: 'directory' and 'filename'
	(any changes to these data sources need to be registered by application developers - !!! revisit)
	  
	 Remote online sources, with their distinct protocols:
   - APIs (HTTP/S - RESTful, GraphQL, ...): 'URL' routes, 'query' names, 'inputs' and identifying 'parameters'
   - Websites (HTTP/S) - 'permalink URLs' and distinct 'HTML DOM elements' which contain content
   - Sources with own proprietary protocols

	 As 'routes' to access data and its 'schema' are not static in longterm with remote sources, 
	 and changes to their routing/naming conventions are usually not communicated in a structured way, 
	 there should be a registry of migrations for schema and route changes
	(consider NPM packages with a generic naming convention, implemented by application developers) */

  // Current, main branch of data node (while multiple branches and translations can be contained within)
  main_branch_id: Integer,

  contains: {}, // 'contains' array is simply merged with schema (it's used in case 'node-rhizome' is running SQL)

  eventsWithState: [actions.platform.create, actions.platform.update, actions.platform.publish,
  					actions.platform.close, actions.platform.remove],
  events: [actions.platform.unpublish, actions.platform.delete]
};

const node_recent_hash = validationSchemaWithEthereum('state');
node = _.merge({}, node, node_recent_hash);
// Hashed recent state of a data node, signifying that a data node has been modified
//(for example, with Git protocol this part of branch is called HEAD)



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

	const rhizome_contained_relations = [
		'TRANSLATION', 	// translations of a data node
		'STEM', 	   	// where this content stemmed / evolved from
		'MERGE',  		// where a branch merged into another branch
		'ROOT',			// where a branch has roots
		'MAIN' 			// main branch of a certain data node
	];
	/* Relations among branches 'contained' within 'node-rhizome' data structure of one distinct data node,
	   have assigned one of the following types: */

	/* const rhizome_agent_types = [
		'AGENrT' 		
	]; 

	!!! this part is in question (if it is to be integrated with this package) - revisit
	   	Stores permitted agents - users (authorized by another service, anonymized, hidden under pseudonym, ...)
					  	  	  	  and groups (circle, organization, ...) */

	const rhizome_external_relations;// = concat(rhizome_agent_types, rhizome_contained_types);

/*  If using functionalities of 'node-rhizome', but storing branches, translations (among other types)
    each as a seperate data node, data types 'contained' in a rhizomatic data node apply here, too (as defined above)

    To enable validation of related data nodes, which are stored in (one or more) databases
    as individual data nodes, but are necessary for context

  - To map relations for reason of validating context of data node, relations defined within scope of application,
  	externally of 'node-rhizome', use a custom 'relation' descriptor:
   (developers must declare a non-conflicting name in relation to any 'contained' and 'agent' relation types)

  ${CUSTOM_RELATION_TYPE_NAME} (relation with another interdependent data node, stored in database) */


/*	Rhizome storage schemes (to validate related data from external services, 'node-rhizome' needs to store 
													  atleast validation hashes of data, if not data itself) */

	var rhizome_related_by_type = {

	  relation: String, 	 		// type of relation (contained, external, agent)
	  language_code: { type: String, optional: true },	// in case it's 'TRANSLATION'

	  contains: {},
	  related_count: Integer, 		// how many data nodes of this type are related to one state of data node
	  
	  // !!! - revisit: Merge here? Hashed list of stored relations, for validation
	}

	var rhizome_related_node = {

	  sql: {
	  	node_id: String,
	  	branch_id: String,
	  	state_id: String,
	  	draft_id: String,
	  },

	  related_node_id: String,
	  related_state_id: Integer,
	  related_state_timestamp: Integer,

	  update_onStateMaterialized: Boolean,	// default: true (when state on branch is changed and materialized)

	  data: String,

	  // !!! - revisit: Merge here? Per relation validation hashes
	};

	rhizome_related_node = _.merge({}, rhizome_related_node, validationSchemaWithEthereum('related_state'));
	
	rhizome_related_by_type.contains = {related: rhizome_related_node};
	rhizome_related_by_type = _.merge({}, rhizome_related_by_type, validationSchemaWithEthereum('related_state'));

/* 	Type 'herstory' and / or 'history': enables 'statechain' to store an audit trail - history of changes to data
													   				  (disabled: only most recent state is stored) 

	   	Materialized data state is hashed for validity (in statechain_hash field)
	  - stores merkletree hash of recent and previous data state on a branch (not including drafts) 

	If Ethereum is to be configured with node-rhizome package, hashes will have been stored there for validation
																						 (as an immutable mirror) */
		
		import {fieldValue, fieldName, fieldDifference} from 'helpers/types';
		var stateFieldValue = _.merge({}, { 
			  state_id: Integer
			}, fieldValue);

		var state = { // stores manifested data states in a validatable format

		  sql: {
		  	id: Integer,
		  	node_id: String,
		  	contains: {data: stateFieldValue}
		  },
		  nosql: { /* State fields and values are added here, as schema depends upon collection */
		  	contains: {data: String};
		  },

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

// Type 'multilingual': enables storing content in multiple languages, by adding translations to rhizome

		const translate_request = {

		  timestamp: Integer,

		  from_language_code: String,
		  to_language_code: String,

		  eventsWithState: [actions.platform.create, actions.platform.close, actions.platform.remove],
		  events: [actions.platform.delete]
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
	# 	Imagining types (see design questions in README.Questions.md)

   		'seen' - enables recording who has given attention to data node and when
   		'reports': enables reporting inappropriate contents, falsifying invalid data
*/