import SimpleSchema from 'simpl-schema';
import config from '../config';

/* 

*/

const stem = {

  id: { type: String, unique: true }, // identifier, which is unique across various implementations?
  									  //(!!! needs a solid way to compute)

  data_provider: String, // example cases: local centralized database, a distributed database, external service API

  // Which data collection is stored ( <- NoSQL; in case of a relational SQL read as table_name and entry_id )
  collection: String, 					// in case of an external service API (REST or GraphQL), this equals call
  document_id: SimpleSchema.Integer,	// ... external service API: this equals id param (or composite of params)

  // Versioning / rhizome - main branch of a certain data point
  main_branch_id: SimpleSchema.Integer

}; // Question: Are "data_provider" and "collection" fields with String type something that could be optimized?

/*

  # Augmented node data structure types

*/

// Type 'rights' and / or 'privileges': adds a list of possibilities to enact change to state of data

	import {actionSchema} from 'actions';

	// Data node's state mutation is an action signed by ...

	const signed = {

		sql: {
		  id: SimpleSchema.Integer,
		  node_id: String,
		  branch_id: SimpleSchema.Integer,
		  state_id: SimpleSchema.Integer
		},

	};

/* 	Type 'herstory' and / or 'history': enables an audit trail, storing changes to data, materializing only recent data state
																			  (disabled: only most recent state is maintained) */

/*	Type 'nodechain': introduces milestones - points on branch of data, where data state is materialized and hashed for validity

					  - stores merkletree of hashed differences in data state on selected milestones,
   					 	calculated from comparison with previous milestone state in chain on current branch

	      			  - this practice could enable future reductions in space needed for data storage
	
						It should also automaticly integrate 'history' and / or 'herstory' type.

    Question: Where and how to bind nodechain ...
    		  - on level of data node, 	<- branches or (sub)versions are undeniable (but can be avoided by copying a data node)
    		  - or on level of branch?	<- branches can be easily detached (unless related data influence each other's hashes)
 */

// Type 'draft': enables one draft per user and per branch (disabled: no drafts can be stored for this data collection)

// Type 'rhizome': enables content co-evolution by stemming new branches of content (disabled: one branch per data node)

// Type 'multilingual': enables storing content in multiple languages, by adding translations to rhizome

// Type 'eventsourcing': enables merkletree hashed trail of signed actions, modifying state of data 


import {eventchain} from 'node_eventchain';


	const branch = { // stores declaration of branch

	  sql: {
	  	node_id: String,
	  	current_state_id: SimpleSchema.Integer
	  },

	  main_branch_id: SimpleSchema.Integer

	};

	// ^	

		const rooted = { // where a branch has roots

		  sql: { 
		  	node_id: String,
		  	branch_id: SimpleSchema.Integer
		  },

		  root_node_id: SimpleSchema.Integer,
		  root_branch_id: SimpleSchema.Integer,
		  root_state_id: SimpleSchema.Integer // pointer to node state, when branch was stemmed

		};

		const merged = { // where a branch merges with another branch

		  sql: { 
		  	node_id: String,
		  	branch_id: SimpleSchema.Integer
		  },

		  merge_node_id: SimpleSchema.Integer,
		  merge_branch_id: SimpleSchema.Integer,
		  merge_state_id: SimpleSchema.Integer // pointer to node state, when branch was merged with another

		};

		const state = { // stores changes to data state

		  language_code: String,
		  machine_translation: String, // provider of machine translation, if any

		  nodechain_hash: String,

	   	  contains: {signed: [signed]}

		};

// Type 'translate': enables storing requests to translate one data node to another language (manually)

		const translate = {


		  language_code: String,

		};

// Type 'reflections': enables commenting contents, giving ability to attach reflected realities during evolving

		const reflections = { 

		};

// Type 'reports': enables reporting inappropriate contents, falsifying invalid data - both in accord with specific circles

		const reports = {

		};

// Type 'tree': data point, nested within a tree structure (relations: hyponomy / hypernymy, synonyms / antonyms)

	const tree = { // Where a node is categorized within a specific tree, in relation to others

	};

	// ^
		const synset = {

		};

		const hypernym = {

		};

		const antonym = {} // Node with an opposite meaning in relation to another

/*

   Imaginary type 'relations': strength of relations (co-relations) among data points
   
     Open question: is there absolute data - would various people have formed same corelations among various data points?
   
   - Yes: it might make more sense to have this data come from 'user', evolving during use
   - No: this data can come from a particular node, averaging corelations as measured during use

   Imaginary type 'seen' ...  

     Open question: should there be a list of users / entities who have seen a certain node?

*/

/* 	
	Questions: 
   	- Where to nest reports and tree - within data node or branch?	
   																	*/