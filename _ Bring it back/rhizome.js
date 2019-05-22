// Work in progress

import {node as nodeSchema, stem_sql, main_branch_sql, branch_root, branch_root, statechain, validation, draft, translate, eventsource, tree_synonym, tree_hypernym} from 'schema';
import SimpleSchema from 'simpl-schema';

import defaults from 'config';

// Code to initialize node-rhizome schema by receiving feature list and actions, which mutate state of data

export class Rhizome {

  constructor(args){

  	var dbConnector = (typeof args.dbConnector !== 'undefined') ? dbConnector : null;
  	var dbPackage = (typeof args.dbPackage !== 'undefined') ? dbPackage : null;
  	var sql, nosql;

  	var supportedDbPackages = { nosql: ['mongoose', 'meteor/mongo'/*, 'couch/pouch/rxdb?'*/], sql: ['knex'] };

  	/*
	// NoSQL: storing recent 'node-rhizome' data part (branch head) to data node's original collection/document
	//		  needs to be defined for each type of collection

  	this.recentStemToCollection = (typeof args.recentStemToCollection !== 'undefined' && 
  										 .args.recentStemToCollection) ? true : false;
  	

  	
  	// SQL: caching recent 'node-rhizome' data part (branch head) in special table, defined case by case

  	this.cacheRecentStem = (typeof args.cacheRecentStem_sql !== 'undefined' &&
  							 	   args.cacheRecentStem_sql == true) ? true : false;

  	this.cache_clear_after = (typeof args.cache_clear_after !== 'undefined' &&
 							  !isNaN(args.cache_clear_after)) ? args.cache_clear_after : defaults.cache_clear_after;
	*/

  	/* 
  	   What else needs to be defined on Rhizome initialization?
	 - set up Ethereum storage

	 - what if 'node-rhizome' is established across several data sources? ()
	*/



  	// Resolving database connector object

  	for(var packageName in 
  		concat(supportedDbPackages.nosql, supportedDbPackages.sql)) {

	  	if(require.resolve(packageName)){
	  		var testObject = require(packageName);

	  		if(dbConnector instanceof testObject){
			  	this.dbConnector = dbConnector;
			  	this.dbPackage = packageName;
	  		}
	  	}
  	}

  	if(typeof this.dbPackage === 'undefined'){
  		throw 'Error: dbConnector undefined';
  	} else {
  		if(supportedDbPackages.nosql.indexOf(dbPackage)){
  			this.dbType = 'nosql';
  		} else if(supportedDbPackages.sql.indexOf(dbPackage)){
  			this.dbType = 'sql';
  		}
  	}
  }

  get(args, callback = null) { // processes one data node at once

	if(!this.connector){
		return false; // an initialized database connector needs to be supplied from within application
	}

	if(typeof args.type !== 'undefined'){
		
	}

	var node;
	if(node = RhizomeSql.getTable(args, knex)){
		
	}
  }

  update(args, callback = null) {
	if(!this.connector){
		return false; // an initialized database connector needs to be supplied from within application
	}
  }

}

class RhizomeSql {

  selectFields(query, args){

  	if(typeof args.fields !== 'undefined' && args.fields.isArray()){
		query.column(fields);
  	}
  }

  getTable(args, knex = null){

  	var query;

	if(typeof args.node_id !== 'undefined'){

	  query = knex('rhizome').modify(selectFields(query, args))
	  		 .where({ node_id: args.node_id });

	} else if(typeof args.collection !== 'undefined' && typeof args.document_id){

	  query = knex('rhizome').modify(selectFields(query, args))
	  		 .where({ collection: args.collection, document_id: args.document_id });
	 
	} else {
		return false;
	}

	return query.then(([rhizome]) => row);
  }
}


const getRhizome = function(args, knex = null){


	var customSchema = (typeof args.customSchema !== 'undefined') ? args.customSchema : null;



	- getRhizome({node_id,
				  collection,
				  document_id,
				  languages,
				  features,
				  customSchema,
				  knex});


	var sql = {
		id: UniqueString;
	}

	/* Populate schema 		- default: above full schema definitions, limited by requested features
							- custom: overwritten with custom schema */
	var schema = [];

	schema['node'] = (customSchema['node']) ? customSchema['node'] : node;

	schema['stem_sql'] = (customSchema['stem_sql']) ? customSchema['stem_sql'] : stem_sql;
	schema['main_branch_sql'] = (customSchema['main_branch_sql']) ? customSchema['main_branch_sql'] : main_branch_sql;

	schema['branch_root'] = (customSchema['branch_root']) ? customSchema['branch_root'] : branch_root;
	schema['branch_merge'] = (customSchema['branch_merge']) ? customSchema['branch_merge'] : branch_merge;

	schema['statechain'] = (customSchema['statechain']) ? customSchema['statechain'] : statechain;
	schema['validation'] = (customSchema['validation']) ? customSchema['validation'] : validation;

	schema['draft'] = (customSchema['draft']) ? customSchema['draft'] : draft;

	schema['translate'] = (customSchema['translate']) ? customSchema['translate'] : translate;

	schema['eventsource'] = (customSchema['eventsource']) ? customSchema['eventsource'] : eventsource;

	schema['tree_synonym'] = (customSchema['tree_synonym']) ? customSchema['tree_synonym'] : tree_synonym;
	schema['tree_hypernym'] = (customSchema['tree_hypernym']) ? customSchema['tree_hypernym'] : tree_hypernym;


	if(sql == true){
		schema.sql = _.merge({}, schema.sql, stem_sql);
		schema.sql = _.merge({}, schema.sql, main_branch_sql);
	}

	if( features.indexOf('plurality') ){
		schema.contains = _.merge({}, schema.contains, { branch_root: branch_root,
														 branch_merge: branch_merge });
	}

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


	schema.contains = _.merge({}, schema.contains, { statechain: statechain,
													 branch_merge: branch_merge });

	if( features.indexOf('herstory') ||
		features.indexOf('history') ){

		schema.contains = _.merge({}, schema.contains, { branch_root: branch_root,
														 branch_merge: branch_merge });
	}

	if( features.indexOf('draft') ){

		schema.contains = { branch_root: branch_root,
							branch_merge: branch_merge };	
	}

	if( features.indexOf('validation') ){
		
	}

	if( features.indexOf('multilingual') ){
		
	}

	if( features.indexOf('tree') ){
		
	}

	if( features.indexOf('reflections') ){
		
	}

	if( features.indexOf('reports') ){
		
	}

	return nodeStructure;
};