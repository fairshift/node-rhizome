import SimpleSchema from 'simpl-schema';

/* Not present in SimpleSchema */

export const Integer = {type: SimpleSchema.Integer}; 
export const Text = {type: String, sqlType: 'Text'};



/* SimpleSchema shortcuts */

export const UniqueInteger = {type: SimpleSchema.Integer, unique: true};
export const UniqueString = {type: String, unique: true};



/* Libraries*/

import BigNumber from 'bignumber.js'; // Library which Ethereum uses for big numbers with more than 48 characters 
export BigNumber;					  //(which Javascript doesn't handle)



/* Embeddable subschema types */

export const fieldValue = { // Field and value schema (SQL)
  field: String,
  value: Text
};

export const fieldDifference = { // Field difference in relation to previous state
  field: String,
  difference: String,
  levensthein: Integer // Steps of change, where applicable
};

export const fieldName {  // Field name schema
  field: String
}

const chain = {
	chain_hash: String,
	chain_hash_ethereum_address: String,
}
/* 	Computing this hash takes as seed hash a previous statechain_hash or eventchain_hash,
	found within current branch, be it a clone of a state in branch where it was stemmed from, or not
	- optionally storing it to Ethereum */

export validationSchema = function(chainType, ethereumRecordAddress = false){

	var schema = {};

  	for(var key in chain) {
   	 if(chain_hash.hasOwnProperty(key)) {
   	  if(key.indexOf('ethereum')){
      	if(ethereumRecordAddress == true){

      	  schema[chainType+key] = chain_hash[key];
      	}
   	  } else {

      	schema[chainType+key] = chain_hash[key];
   	  }
     }
    }

    return schema;
}

export validationSchemaWithEthereum = function(chainType){
	return validationSchema(chainType, true);
}