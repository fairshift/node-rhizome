import SimpleSchema from 'simpl-schema';
import {UniqueString} from 'types';
import lodash from 'lodash';

/*
	
	Main form of data schema in this package is defined with use of SimpleSchema uncompatible array, with addition of:

	- properties 'sql' (containing sql-only table reference fields) and 'contains' (containing subschema objects)
	
	- there is a function in connectors/sql-knex.js, which creates table from forementioned, modified SimpleSchema arrays

	- a function will be written soon, which will parse this modified array to a SimpleSchema object 
																   (which can be used for validation)

*/


export { parseSchema, nodeSchema };