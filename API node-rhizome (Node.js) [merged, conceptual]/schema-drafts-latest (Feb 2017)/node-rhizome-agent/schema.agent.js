
/* 
	This file defines schema of recent data node state, reusing some elements of from schema.js

	NoSQL implementations can store data, structured in this document, within collection of data node's origin,
	storing the full 'node-rhizome' data structure (as seen in schema.js) in a seperate collection/document

	SQL implementations can use this schema to create cache tables for specific data types, stored within tables
 */

import * from 'json-schema'; // http://json-schema.org/ format
import * from '../meteor-json-simple-schema/json-simple-schema.js'; // transpile from json-schema to simpl-schema
//
import SimpleSchema from 'simpl-schema';						  // library, which validates inputs 
																	                    //(compatible with Meteor/MongoDB)

import {Text, Integer} from 'helpers/types';
import {validationSchema, validationSchemaWithEthereum} from 'helpers';
import lodash as _ from 'lodash';



/* A list of actions that create and modify state of data, defined within scope of 'node-rhizome' package
  (while rules of access to data are defined in scope of application) */

import {actions} from 'actions'; 	// since this is a mirror of a part of data node,
									//'eventsWithState' are used (to generate fields) and not 'events'



// To-do: Translate schema into JSON schema type

var node_current = { // will see how much of 'schema.js' applies (!!!), and how much needs to be restructured

  id: { type: String, unique: true }, // data node identifier key, unique for each data node

  // Current, main branch of data node (multiple branches and translations can be contained)
  branch_id: Integer, 
  branch_timestamp: Integer,

  // Current published state
  state_id: Integer,  
  state_timestamp: Integer,

  contains: {},

  eventsWithState: [actions.platform.create, actions.platform.update, actions.platform.publish,
  					actions.platform.close, actions.platform.remove],

  events: [actions.platform.unpublish, actions.platform.delete]
};

node_current = _.merge({}, node_current, hashSchema('state'));


/* 	
	Type 'rhizome': data node's state of mapped relations within plurality of co-evolving contents
*/

import {rhizome_related_node, rhizome_by_type,
		contained_relation_types, agent_relation_types, external_relation_types,
		translate_request} from 'schema';

// Type 'multilingual': enables storing content in multiple languages, by adding translations to rhizome

import {state, state_translate_request} from 'schema';

import {draft, draft_translate_request} from 'schema';

