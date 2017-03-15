import {Text, Integer} from '../../simpleschema-sql/types';
import {actions, actionSchema, permission} from 'actions';

// Type 'plurality': enables content co-evolution by stemming multiple branches of content (disabled: one branch per data node)
	
export const branch_root = { // where a branch has roots

  sql: { 
  	node_id: String,
  	state_id: Integer
  },

  root_node_id: Integer,
  root_state_id: Integer, // pointer to node state, where branch was stemmed

  eventsWithFields: [actions.platform.create, actions.platform.remove],
  events: [actions.platform.delete]
};

export const branch_merge = { // where a branch merges with another branch

  sql: { 
  	node_id: String,
  	state_id: Integer
  },

  merge_node_id: Integer,
  merge_state_id: Integer, // pointer to node state, when branch was merged with another

  eventsWithFields: [actions.platform.create, actions.platform.remove],
  events: [actions.platform.delete]
};