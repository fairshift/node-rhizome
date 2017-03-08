/*   
  
  # Declaration of actions, which create or modify state of various collections (types of data) on this online platform
  - For each data collection a set of possible actions can be defined, which create state to be stored.

    State, created by actions is stored in two places:

      - collection / table usually stores recent state, which has a creator's user_id or entity_id stored
      - "augmented data node collections" can store history of changes - in other words 'eventsourcing', 'audit trail'

      ^  The latter one is implemented within "node-rhizome" (package to augment existing data collections), 
         while the first can also be used elsewhere ( with use of "simpl-schema" package, using .extend() )

*/

import SimpleSchema from 'simpl-schema';
import {Integer} from 'types';


const actionSchema;

// To be generated with use of "actionSchema" function (found below in this document),
// by selecting "actions" definitions (as defined within scope of application)


const actions = {}; // Suggested layout of actions - extend this object with your own definitions

/* 

  # Actions, possible in (broader) context of this online service and its frontend implementations
  - Should be declared according to actions, required for service in development

*/

// Actions, related to this package, possible within bounds of this online service
actions.platform = { stem: '+med', cut: '',
                     /*...*/ };

// Actions, with which this package imports data from external, integrated online services
actions.imported = {};

// Actions, requested from users by this package, which were made offline at another point in time
actions.offline = {};

// 'eventsourcing' action types - not sure if this is going to be used !!! revisit
actions.types = [ 
  '+', // Data part was added
  '-', // Data part was removed
  '~'  // Data part was modified
];

export actions;

const actionSchema = function(actionsArray){ // agentId is unified (service+"-"+entityType+"_"+id); isn't 'user_id' or 'circle_id'

  var schemaArray = {};

  for(var action in actionsArray) {
   if(actionsArray.hasOwnProperty(action)) {

    var enacted = action + actionsArray[action].substr(1);

      for(n = 0; n < agentsArray.length; n++){

        schemaArray[enacted+ "_" + agentsArray[n]] = String;
        schemaArray['timestamp_'+enacted] = Integer;
    }
  }

  return schemaArray; // !!! revisit - generate SimpleSchema here?
}

/*

  Notes on a some relevant modes of data manipulation:
  - Basic functions of persistent data storage: CRUD - Create, Read (Retrieve), Update (Modify), Delete (Destroy)
                                               (^ and some other variations)

  - Immutable data - original data state is never overwritten - it is instead replicated and 
    only then its copy is mutated (= modified, updated, changed)

  - Mutate and Query (+ Subscribed) commands of GraphQL protocol can be described as 
    Command Query Responsibility Segregation (CQRS) - where read and write operations are logically separated

    ( Are there immediate "write" effects while observing or "reading" reality in quantum mechanics? )

*/