/*

  # Content access / modify rules within:

  - assigned to data node itself
  - assigned to circle of people, within which it is shared

   'node-rhizome' strategy of implementation: 
    rhizome relation type 'AGENT', assigned on level of branch / state,
      - cloned when stemmed (default)
      - !!! idea: if manifested state of branch head diverges, agents are prompted to choose a branch
  
  # References

  - check out https://www.npmjs.com/package/@alanning/roles (requires mongodb users collection, assigns roles to a key and to user)
  - study Ceptr's holochain design, where data state is written to user's own DHT and then propagated among users
         (https://github.com/metacurrency/holochain)
  Idea:

   [permissions X agents]
  - roles are not defined within this package or database, 
    instead they are defined on this granular, agent-per-permission level,
    whereas roles (groups of permissions) can be implemented by front-end developer
   (information about agents is replicated * number of permissions)

     | SQL tables     |
     | roles          |
     | content        |
     | content_roles  |
   
   [roles X permissions]: [agents]
  - 

  # To-do:


*/

// One permission stores many agents

const permittedAgentsSchema = {


}




// permissionsSchema is generated by selecting "actions" definitions (as defined within scope of application)

const permissionsSchema = function(actionsArray){

  var schemaArray = {};

  for(var action in actionsArray) {
   if(actionsArray.hasOwnProperty(action)) {

    var enacted = action + actionsArray[action].substr(1);

    for(n = 0; n < agentsArray.length; n++){

      schemaArray[action] = Boolean;
    }
   }
  }

  return (render) ? parseSchema(schemaArray) : schemaArray;
}