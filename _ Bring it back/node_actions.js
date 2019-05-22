import SimpleSchema from 'simpl-schema';

/*   
  
  # Declaration of actions, which create or modify state of various collections (types of data) on this online platform
  - For each data collection a set of possible actions can be defined, which create state to be stored.

    State, created by actions is stored in two places:

      - collection / table usually stores recent state, which has a creator's user_id or entity_id stored
      - "augmented data node collections" can store history of changes - in other words 'eventsourcing', 'audit trail'

      ^  The latter one is implemented within "augmented data node collections" package, 
         while the first can also be used elsewhere ( with use of "simpl-schema" package, using .extend() )

*/



// To be generated with use of "actionSchema" function, by selecting "actions" definitions (both defined below in this document)

export function actionSchema(actionsArray, agentsArray = {'user', 'entity'}){

  var schemaArray = {};

  schemaArray = actionsArray.map(function(action){ // !!! revisit map function

    var tempObj;

    for(n = 0; n < agentsArray.length; n++){

      tempObj[action + "_" + agentsArray[n]] = String;
    }

    tempObj["time_"+actionsArray[i]] = SimpleSchema.Integer;

    return tempObj;
  });

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

const actions = {};

  actions.types = [ // Not sure if this is going to be used !!! Revisit
    '+', // Data part was added
    '-', // Data part was removed
    '~'  // Data part was modified
  ];
  
  //Actions, made in context of this online service and its frontend implementations
  actions.platform = {

    register: '+ed',

    activate: '+d',

    deactivate: '+d',

    message: '+d',

    create: '+d',

    publish: '+ed',

    unpublish: '+ed',

    encircle: '+d',

    see: '+n',
    reflect: '+ed',
    value: '+d',
    report: '+ed',
    resolve: '+d',

    request: '+ed',
    invite: '+d',

      accept: '+ed',
      attend: '+ed',
      confirm: '+ed',

      deny: 'denied',

    edit: '+ed',
    visit: '+ed',

    represent: '+ed',
    manage: '+d',

    close: '+d',
    remove: '+d',
    delete: '+d',

    vote: '+d'
  }

  //Actions, which import data from external, integrated online services
  var actions.imported = {

  };

  //Actions, made offline at another point in time
  var actions.offline = {
    
      conceive: '+d',
      join: '+ed'
  }


export actions;