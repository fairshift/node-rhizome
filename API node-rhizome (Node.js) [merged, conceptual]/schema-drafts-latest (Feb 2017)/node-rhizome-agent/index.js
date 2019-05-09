/*

  # Package: 'node-pseudonym'
  - Allows users to enter data under pseudonyms, masking their identity, but being able to reveal it at a later point

    Uses Knex SQL connector
*/

import {createTable} from '../simpleschema-sql';
import {Text, Integer} from '../simpleschema-sql/types';

export const user_pseudonym = {

/* Questions:
         -  One pseudonym per user?
         -  Should pseudonym be unique across database? */

  user_id: { type: Integer, unique: true },  // !!! revise
  pseudonym: { type: String, unique: true }, // !!! revise 

  eventsWithFields: [actions.platform.create, actions.platform.close, actions.platform.remove],
  events: [actions.platform.delete]
};

export const createPseudonymTable = function(tableName, schema, knex){
  
  return createTable(tableName, schema, knex);
}

export const getUserByPseudonym = function(tableName, pseudonym, knex){

  return knex(tableName).where({pseudonym: pseudonym});
}

export const getPseudonymByUser = function(tableName, user_id, knex){

  return knex(tableName).where({user_id: user_id});
}

export const addPseudonym = function(tableName, user_id, pseudonym, knex){

  if(!getUserByPseudonym(knex, tableName, pseudonym) && getPseudonymByUser(knex, tableName, user_id)){
      return knex.insert({
          user_id: user_id,
          pseudonym: pseudonym
      })
      .returning({'id', 'pseudonym'});
  } else {
    return 'exists';
  }
}