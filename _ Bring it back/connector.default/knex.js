import SimpleSchema from 'simpl-schema';
import lodash from 'lodash';
import {Integer, UniqueInteger, UniqueString} from 'types';

/* Parse JSON schema to SimpleSchema
import meteor-json-simple-schema/json-simple-schema.js
https://github.com/bshamblen/meteor-json-simple-schema/blob/master/json-simple-schema.js */

// Generate tables from schema array (before applying SimpleSchema on it), and then createTable with Knex

export const createTables = function(name, schemaArray, knex){

	// Create table

	knex.schema.hasTable(name).then(function(exists) {

		if (!exists) {

		    return knex.schema.createTable(name, function(table) {

		    	var id_was_set = false,
		    		max_length = 0,
		    		uniqueFields = [];

		    	if(typeof schemaArray.sql){
		    		//!!!
		    	}

		  		for(var field in schemaArray) { // http://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
		   		 if(schemaArray.hasOwnProperty(field) && field != 'contains') {

		   		 	var obj = schemaArray[field];

		   		 	if(Object.keys(obj).length > 1){

			   		 	if(field == 'id'){
		   		 			if(max_length > 0){
		   		 				table.string('id', max_length);
		   		 			} else {
		   		 				table.string('id');
		   		 			}
			   		 		id_was_set = true;
			   		 	}

			   		 	if(typeof obj.max !== 'undefined' && obj.max.isInteger){
			   		 		max_length = obj.max;
			   		 	} else {
			   		 		max_length = 0;
			   		 	}

			   		 	if(typeof obj.type !== 'undefined'){

			   		 		if(obj.type == String){

			   		 			if(max_length > 0){
			   		 				table.string(field, max_length);
			   		 			} else {
			   		 				table.string(field);
			   		 			}
			   		 		}

			   		 		if(typeof obj.sqlType !== 'undefined' && obj.sqlType == 'Text'){
			   		 			table.text(field);
			   		 		}

			   		 		if(obj.type == SimpleSchema.Integer){ // also works for dates

			   		 			if(max_length > 0){
			   		 				table.integer(field, max_length);
			   		 			} else {
			   		 				table.integer(field);
			   		 			}
			   		 		}
			   		 	}

		   		 		if(typeof obj.unique !== 'undefined' && obj.unique == true){

		   		 			uniqueFields.push(field);
		   		 		}

		   		 	} else {

			   		 	if(_.isEqual(schemaArray[field], Integer) || 
			   		 	   schemaArray[field] == SimpleSchema.Integer){ // https://lodash.com/docs/4.17.4#isEqual

			   		 	   	table.integer(field); // also works for dates
			   		 	}

			   		 	if(schemaArray[field] == String){

			   		 		table.string(field);
			   		 	}
			   		}
		      	 }
		   		}

		   		if(!id_was_set){
		   			table.increments('id').primary();
		   		}

		   		if(uniqueFields.length){
		   			table.unique(uniqueFields);
		   		}
		  	}
		}
	});
	
	// Look for contained tables - 'contains' element
	
	for(var field in schemaArray){ // http://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
									// Question: Is _.map slower than "for(var key in myObject) {"

	 	if(field == 'contains') {
		
			for(var table in schemaArray[field]) {

				createTables(name+"_"+table, schemaArray[field][table]);
			}
	 	}
	}
}

const parseSchema = function(schemaArray, sql = true){

	var fields = [];

	if(sql == true){
		sql = schemaArray.sql;


	}

	return SimpleSchema(schemaArray);
}