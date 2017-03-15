import SimpleSchema from 'simpl-schema';
import {Text, Integer} from '../simpleschema-sql/types';
import lodash as _ from 'lodash';

/* Type 'rights' and / or 'privileges': adds a list of possibilities to read and write to state of data
    (when disabled for a collection, rules of data manipulation can be defined elsewhere in application) 

   Weighing, where to evaluate permissions:

   - within this package: can make less calls to database, though this needs storage in 
   - outside of this package: can reuse application code and database */
import {actions, actionSchema, permission} from 'actions';

/* Question: Should each branch of a node have an entry of its own in its collection? 
  		  [X] Yes, because: it's easier to attach to existing database layouts
  		   - No, because: this way there's less entries in database, and more pressure on those entries to be corrected
  		   - Both options could be possible, leaving decision to maintainers of each branch (if so programmed in application) */

const node = {

  id: { type: String, unique: true }, // identifier, unique across a database
  									  //(!!! needs a solid way to compute)

  data_provider: String, // example cases (!!! revisit): URL of a service's API; protocol/network of a distributed service

  // Which data collection is stored ( <- NoSQL; in case of a relational SQL read as table_name and entry_id )
  collection: String, 					// in case of an external service API (REST or GraphQL), this equals call
  document_id: Integer,	// ... external service API: this equals id param (or composite of params)  

  // Current state of data node (there can be multiple states stored, while one is currently chosen)
  sql: {
   current_state_id: Integer
  },
  /*nosql: { // NoSQL IDs are not necessarily numeric and incremental (as seen with MongoDB)
   current_state_id: String (!!! revisit if necessary)
  },*/

  eventsWithFields: [actions.platform.create, actions.platform.close, actions.platform.remove],
  events: [actions.platform.delete]
};

	const stem_sql = { // Where this content stemmed / evolved from (could be undefined)

	  stem_node_id: String,
	  stem_state_id: Integer
	};

	const main_branch_sql = { // Versioning and branches - main branch of a certain data point (can point at itself)

	  main_branch_node_id: String,
	  main_branch_state_id: Integer,
	};

// ^ 'node_rhizome' contains - Augmented node data structure types as listed below:

// Type 'rhizome': enables plurality of content - co-evolution by stemming multiple branches of content

	const branch_root = { // where a branch has roots

	  sql: { 
	  	node_id: String
	  },

	  state_id: Integer,

	  root_node_id: Integer,
	  root_state_id: Integer, // pointer to node state, where branch was stemmed

	  eventsWithFields: [actions.platform.create, actions.platform.remove],
	  events: [actions.platform.delete]
	};

	const branch_merge = { // where a branch merged into another branch

	  sql: { 
	  	node_id: String,
	  },

	  state_id: Integer,

	  merge_node_id: Integer,
	  merge_state_id: Integer, // pointer to node state, when branch was merged with another

	  eventsWithFields: [actions.platform.create, actions.platform.remove],
	  events: [actions.platform.delete]
	};

/* 	Type 'herstory' and / or 'history': enables 'statechain' to store an audit trail - history of changes to data
													   				  (disabled: only most recent state is stored) 

	   	Materialized data state is hashed for validity (in statechain_hash field)
	  - stores merkletree of hashed differences in recent and previous data state on current branch (not including drafts) 

	If Ethereum is configured with node-rhizome package, hashes are stored there for validation (as an immutable mirror) */

		const state_sql = { // fields, containing data state (SQL version)

		  field: String,
		  value: Text
		}

		const statechain = { // stores manifested data states in a validatable format

		  sql: {
		  	node_id: String,
		  	state_id: Integer,
		  	contains: {state: state_sql}
		  },
		  /*nosql: {},*/

		  language_code: String,
		  machine_translation: String, // provider of machine translation, if any

		  eventsWithFields: [actions.platform.create, actions.platform.remove,
		  					 actions.platform.publish, actions.platform.unpublish],

		  events: [actions.platform.mutate,
		  		   actions.platform.request_translation, actions.platform.translate,
		  		   actions.platform.reflect,
		  		   actions.platform.delete]
		};

		// ^ merge 'validation' into 'statechain'

			const validation = {
			  statechain_hash: String
			  /* Computing this hash takes as seed hash a previous statechain_hash
			 	(in this branch, or a statechain_hash of state on a branch where it was stemmed from),
			  	 optionally storing it to Ethereum

			  	 Question: What if it was important to include datasets related to this branch at time of hashing? */
			}

/* 	Type 'draft': enables one draft per branch

  	Question: What if it enabled each user to create one draft per branch? */

		const draft = { // recent, manifested state, to be put in statechain

		  sql: { 
		  	node_id: String,
		  	branch_id: Integer,
		  	contains: {state: state_sql}
		  },

		  language_code: String,
		  machine_translation: String, // provider of machine translation, if any

		  eventsWithFields: [actions.platform.create, actions.platform.mutate],
		  events: [actions.platform.delete]
		};

// Type 'multilingual': enables storing content in multiple languages, by adding translations to rhizome

		const translate = {

		  from_language_code: String,
		  to_language_code: String,

		  eventsWithFields: [actions.platform.create, actions.platform.close, actions.platform.remove],
		  events: [actions.platform.delete]
		};

/* Type 'eventsourcing': enables storing signed actions, which are related to a branch, as events

   	Events in eventsource are hashed for validity (in eventchain_hash field)
  - events in between a sequence of two materialized states can be removed keeping statechain_hash validation (to reduce storage)

    Question: How could datasets related to a data node (not just the contents) leave a trace in 'validation'? */

		const eventsource = {

		  sql: {
		  	node_id: String,
		  	branch_id: Integer,

		  	// How should this be carried out?
		  	action: String,		// which action was performed

		  	// Serialized changed fields and data ... (+, -, ~)
		  	action_add: '', 	// array of fields and values which were removed (modified later on)
		  	action_remove: '', 	// array of names of fields which were added

		  	// diff patch
		  	action_mutate: '' // array of fields and difference patch of their modified data
		  },
		  //nosql: {},

		  eventchain_hash: String, /* Computing this hash takes statechain_hash of previous manifested state as root 
		  							 (in this branch, or a statechain_hash of state on a branch where it stemmed from),
		  							  and includes events up to and including recent one */

		  eventsWithFields: [actions.platform.create],

		  events: [actions.platform.strip,	// keep events and hashes, but delete data: action_add, action_remove, action_modify
		  		   actions.platform.clear]	// delete events, hashes and data from 'eventsource'
		};

		/* const signed = {
			node_eventsource_id: Integer,
		}; */

/* Imagining extending 'signed' to type 'contributors': aggregating a list of agentId's, contributing to a materialized state
							    								- can be built by taking in 'eventsource' data (if it's there)

	Question: How much data to aggregate along with one materialized state? 
   			- one state; one branch; across N branches; whole registered stem history) */

// Type 'tree': data point, as nested within a tree structure (relations: hyponomy / hypernymy, synonyms / antonyms)

	const tree_synonym = { 

		synonym_node_id: Integer,
		synonym_state_id: Integer, // pointer to node state, where branch was stemmed

		eventsWithFields: [actions.platform.create, actions.platform.remove],
		events: [actions.platform.delete]
	};

	const tree_hypernym = { // Where a node is categorized within a specific tree, in relation to others

		hypernym_node_id: Integer,
		hypernym_state_id: Integer, // pointer to node state, where branch was stemmed

		actions: [actions.platform.create, actions.platform.remove],
		events: [actions.platform.delete]
	}

	// const synset = {} 	   // Group of synonyms (eg. WordNet uses this structure - see wordnet.princeton.edu)
	// const tree_antonym = {} // Node with an opposite meaning in relation to another

/*

   Imagining types ...

   # 'seen' - Question: Should there be a list of users / entities who have seen a certain node?


   Imaginary type 'reports': enables reporting inappropriate contents, falsifying invalid data

   # Question: Should it be tied to a data node, instead of circles within which data nodes have influence?

*/