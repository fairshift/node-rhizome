import SimpleSchema from 'simpl-schema';
import {UniqueString} from 'types';
import lodash from 'lodash';

/*
	
	Main form of data schema in this package is defined with use of SimpleSchema uncompatible array, with addition of:

	- properties 'sql' (containing sql-only table reference fields) and 'contains' (containing subschema objects)
	
	- there is a function in connectors/sql-knex.js, which creates table from forementioned, modified SimpleSchema arrays

	- a function will be written soon, which will parse this modified array to a SimpleSchema object (can be used for validation)

*/

const function parseSchema(schemaArray){

	return SimpleSchema(schemaArray);
}

// Code to compile node structure by receiving feature list and actions, which mutate state of data

const function nodeStructure(features, actions){

	var sql = {
		id: UniqueString;
	}

	if( features.indexOf('rights') || 
		features.indexOf('privileges') ){


	}

	if( features.indexOf('herstory') ||
		features.indexOf('history') ){


	}

	if( features.indexOf('draft') ){
		
	}

	if( features.indexOf('rhizome') ){

	}

	if( features.indexOf('eventchain') ){
		
	}

	if( features.indexOf('multilingual') ){
		
	}

	if( features.indexOf('translate') ){
		
	}

	if( features.indexOf('tree') ){
		
	}

	if( features.indexOf('reflections') ){
		
	}

	if( features.indexOf('reports') ){
		
	}

	return nodeStructure;
};


const function nodeSchema(features, actions){

	return nodeSchema;
}

export {parseSchema, nodeStructure, nodeSchema};