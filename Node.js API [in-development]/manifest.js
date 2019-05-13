/*

  ****************************

    Database schema overview

  ****************************

  Purpose of this document is ...
  - offering clarity to a person looking to understand ...
  - defining programmaticly the data structures and functionalities ...


  Networks of brain and computer nodes are more aware when interacting to collaboratively shape a more complete picture,
  augmented with facts (data-driven), which can only emerge in a process - enabled by the following factors (enablers):

    * a process of collecting, storing and processing data that enjoys trust at both ends, social and technological

    * on the social end trust is enabled by an engaged critical mass of honest peers,
      beholders of values such as {"values": ["honesty", "integrity", "responsibility"...] }

    * trust in validity (immutability) of data in storage, which can be based on a mathematical proof
     (as with blockchain's merkletree and consensus protocol - distributed, verifiable data)

    * process addresses needs of real people, from which positive change can sprout,
      and their adoption serves as proof of validity of outcomes

*/


// # Augmented collection: Multilingual data structure
  language = {
  	schemaRef: './link-to/schema.file#/variableOrKey/key', /* 
  		JSON schema: referenced "variableOrKey" is an object key
			SimpleSchema: referenced "variableOrKey" is a name of an exported schema (variable name)
		*/

  	augment: ['multilingual'],
  	containsMany: { // Define relations
  									// ... is synonymous with using '#'
  									//		(as an indexed array with numeric key indexes)

      // bot: 'node' // idea: artificial intelligence and people could assist each other in understanding meanings
      // ^ above collection is commented out as [co-]creator[s] of this projects cannot manage to realize it yet
    }
  }; /*    

  ^ Explanation: 'node+multilingual' -> What is this?

  A way to declare a subset of generalized data structures and functionalities to any type of data nodes, like this:

    +privileges, +reflections, +evaluation, +multilingual, +herstory / +history, +rhizome
    '{collectionName}' => 'node+{structureName1}+{structureName2}+...'

    More details on these structures to be revealed further on ...

  * At the time of writing this document "node" represents a data point, solely
    (and not a network software application, such as Node.js - within which the web-facing part of this service will run)



  # Collection: conscious agents - users and circles (groups - entities with representatives acting in their names)
  
  - Question being, how do private affairs and property fit on a centralized server - or on a public blockhain?

*/

  // Users, registered on platform
  collections.user = { containsMany: {

    // list of languages a person understands / speaks, ranked by level of fluency
    language: { relation: collections.language },

    user_email: {}, // registered / validated emails
    user_oauth: {}  // authenticated with an external service
  }};

  // Circles - groups of people with something in common (commoners)
  collections.circle = { containsMany: {

    circle_commoner: {}, // list of users and circles

    circle_language: {}  
    //^ List of languages that members of a circle understand / speak; are willing to translate
    //  Metrics and statistics, describing circles' members' use of languages and translating among them
  }};

  // Entity - abstraction of user and circle, actors that enact their visions with peers
  // Entities act upon decisions in their own name - responsibly, by strengthening awareness of impacts while reflecting
  collections.entity: { containsMany:  // acting in one individual's own name or name of a group (circle)

    member: {}, // one or more members (union of people and circles), acting upon their own shared vision
    /* entity_language: 'node', // list of languages in which an entity can communicate */

  // What we need, what we can offer, what we value (appreciate)
    need: {},      // list of needs - tagged resources or descriptive; present and past / recurring
    resource: {},  // pool of disclosed resources which this entity governs
    value: {},     // values we care of (enacted and appreciated), narrowing in on preferred ways of doing

  // Gestures - desired scenarios - descriptions of recurring patterns (activities and flowing resources)
    gesture: { node: ['multilingual', 'rhizome'], containsMany: { // contains a set of transactions and aggregation

      resource: { node: ['multilingual', 'rhizome'] }             // typical / average flow of resources in
      transaction: { relation: entity.containsMany.transaction }
    }}, 

  // Transactions - occurences of a gesture or variant on a template - a transaction
    // Flow of ... among giving and receiving entities (meta data of an act of sharing)

    transaction: { node: ['multilingual', 'reflections'], containsMany: {

      resource: { node: ['tree'] }, // resources, which flow while sharing
      need: { node: ['tree'] },     // needs, fulfilled with this gesture
      value: {},                    // reflected, enacted values (describing intangibles)
    }, 


  // Planning ahead, defining objectives (target goals) and measurables

    // A formalized vision of future state
    vision: { node: ['multilingual', 'reflections', 'rhizome'] }, 

    // Objectives person / organization sets for manifesting envisioned future
    objective: { node: ['multilingual', 'reflections', 'rhizome'], contains: {
      
      gesture: {},  // a reflected good practice, representing a reached goal
                    //(can be experienced by peers outside of a given circle)

      metric: { containsMany: {  /* Defined metrics, a set of quantifiable points 
                      of observation; parameters revealing clues on assumed factors (causes)

                      Enabling informed decisions to reach goals by using metrics, 
                      key to core and supporting activities, while (in)validate assumptions
                      about community resources, needs and preferrences (values) - using data:
                      - measuring inputs (work; resources; ...),
                      - ways of undertaking activities (relationships; alternatives; ethics; ...),
                      - outcomes (fruits; impacts; satisfaction; harms; ...)

                      Hereby defined:
                      - approximated weighs among metrics, attributing to causing factors
                      - frequency of measurement / fetching data from sources */

        source: {}, // pointers to data stored in local database or external service API
        data: {},   // time-series of collected data
      }},

    // Weighs (relative ratios) among various objectives and metrics (factors) are 
    // taking into account known (interpreted) causes and attributing to them a level of importance

    // Causality is iteratively attributed while contemplating at various occasions, 
    // reflecting upon experiences in a given context

    attribution: {  // Within and beyond organizational borders,
                    // people of formal and informal organizations who are part of a cause,
                    // are leaving volumes of trails in data, which could be attributed to them as a currency

      relation: entity.containsMany.objective.containsMany.metric.containsMany.data
    },  
                      
                      
    // Communications and notifications; conflict resolution
    message: { node: ['multilingual'] }, // messaging among 
    notification: {},
    report: {}                           // reporting unethical activities, falsifying invalid data
  };

/*

  # Collections of data (accessible according to rights / privileges and circle memberships)

*/

  var needs = { // a tree structure of need definitions, rooted in basic needs
      need: 'node+privileges+rhizome+tree'
  };

  var resources = { // a tree structure of resource definitions
      resource: 'node+privileges+rhizome+tree',
      resource_type: 'node' // raw, product, service, ...
      resource_unit: 'node+privileges+tree'
  };

  var gestures = { // symbols of patterns, emerging from recurring (inter)actions and behaviours
      gesture: 'node+privileges+rhizome+tree', // templates, which can be personalized to a specific occasion
      // gesture_leap: 'node' // describing change in habits - does "leap" fit better in node_stem?
  };

  var values = { // values, words which are meaningful upon truthfully reflecting shared, interpersonal experiences
      value: 'node+privileges+rhizome+tree', // tree structure of value keywords
      value_observable: 'node+privileges+rhizome',
      // collection of parameters, community-proposed metrics for measuring a certain effort / impact, tied to values

      // value_model_contract: 'node', // collection of user-defined contracts
      // example contract: when a condition is met, words used by a given person / entity are replaced or auto-corrected
  };

  var units = { // units of measurement (attach a versioning process to establish new agreements, using +rhizome)
      unit: 'node+privileges+multilingual', // eg.: unit of ___ (eg. time or energy) used to form an (object and/or experience)
      unit_conversion: 'node+privileges+multilingual' // ratios among related units (synonyms of different multitudes)
  };

  var places = { 
    place: 'node+multilingual+rhizome', // list of places at locations
    place_entity: 'node',               // people and organizations, residing in places
  };

  var portals = {
    portal: 'node+multilingual+rhizome', // events at (multiple) locations behave as portals into this online medium
    portal_place: 'node' // portals 
  };

/*

  Site specific data structures - multiple sites can use the same backend through GraphQL protocol

*/

  var sites = { 
      site: 'node',
        site_circle: 'node',
        site_circle_type: 'node',
        site_entity_type: 'node',
        site_namespace: 'node',
        site_user: 'node'
  };

/*

  # Appending additional structures / functionalities to any type of data node (collection):

    +rights / +privileges, +reflections, +multilingual, +herstory / +history, +draft, +rhizome, +reflection

    Patterns to acknowledge further on in development - for providing data validity (with or without encrpytion):
    - event sourcing - npmjs.com/search?q=event+sourcing (immutable, CQRS)
    - internal data validity - hashing npmjs.com/search?q=merkle, together with ...
    - immutable, verifiable storage with Ethereum (mirroring data hashes on blockchain)

*/

  var nodes = {
      node: 'node',

  // +rights and +privileges - adds a list of rights / privileges - abilities to enact change to state of data
        node_action: 'node',

  // +herstory / +history - enables an audit trail, storing any changes to data (disabled: current state)
  // +draft - enables one draft per user and per branch (disabled: no drafts can be stored for data node of current)
  // +rhizome - enables content co-evolution by stemming new branches of content (disabled: one branch per data node)
  //             - a versioning process to establish new agreements (towards eventual, perhaps unlikely consensus)
        node_stem: 'node', // version of data, stemmed off one particular node
          node_stem_state: 'node', // trail of changes to data in a stem of interest
          node_stem_draft: 'node', // drafts to edit later
        // node_stem_leap: 'node', // vectors of change in a particular flow of evolution (within one stem or across)

  // +multilingual - enables storing content in multiple languages, by adding translations to rhizome
          node_translate: 'node', // requests to translate one data node to another language

  // +reflections - adds comments to contents, able to attach reflected realities while evolving
        node_reflection: 'node+history',
      // node_reflection_gesture: 'node', // attaching relevant gestures and reflections by entities

  // +tree - data point, nested within a tree structure (relations: hyponomy / hypernymy, synonyms / antonyms)
        node_tree: 'node', // where a node is categorized within a specific tree, in relation to others
          node_tree_synset: 'node', // a synonym set of ~ equal meaning
          node_tree_hypernym: 'node', // synsets of different meaning are nested within an umbrella term
        //node_tree_antonym: 'node', // node with an opposite meaning in relation to another

  // +report
        node_report: 'node' // reporting inappropriate contents; falsifying invalid data
  };



/*

  # Declaration of actions, which create or modify state of various collections (types of data) on this online platform

  Notes on a some relevant modes of data manipulation:
  - Basic functions of persistent data storage: CRUD - Create, Read (Retrieve), Update (Modify), Delete (Destroy)
                                               (^ and some other variations)

  - Immutable data - original data state is never overwritten - it is instead replicated and 
    only then its copy is mutated (= modified, updated, changed)

  - Mutate and Query (+ Subscribed) commands of GraphQL protocol can be described as 
    Command Query Responsibility Segregation (CQRS) - where read and write operations are logically separated

    ( Are there immediate "write" effects while observing or "reading" reality in quantum mechanics? )

*/
  
  var actions = {};

  // Actions, made in context of this online service and its frontend implementations
  actions.platform = {

    register: { stateVar: '+ed' },
    activate: { stateVar: '+d' },
    deactivate: '+ed',

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

  // Actions, which import data from external, integrated online services
  var actions.imported = {

  };

  // Actions, made offline at another point in time
  var actions.offline = {
      conceive: '+d',
      join: '+ed'
  }

/*

  Voting mechanisms to enact motions in groups of people (circles)

*/

  circles.voting.realizesAction = ['circleMajority', 'circleSpecifiedMajority', 'circleConsensus', 'empowered'];

  circles.voting.entityPower = [
    // Voting power is distributed ...
    'equalVotePerPerson', // equally among its members - individuals
    'equalVotePerEntity', // equally among its members - individuals and groups

    // Voting power is distributed, according to weighs, described in a specific value system, ...
    'fairVotePerPerson', // among individual members
    'fairVotePerEntity', // among individuals individuals and groups

    // There can be individual entities with power of veto
    'personCanHaveVeto',
    'circleCanHaveVeto',
    // 'entityCanHaveVeto' // both of the above
  ];

  circles.voting.delegate = [ // Entities (users and circles) can delegate their vote to a trusted peer
    'entrustPeer',
    'entrustExpert'
  ];

/*

// Tables generator
  // Privileges - actions create/modify state on collection

    /*

    actors.user.actions.anonymous = [register];
    actors.user.actions.self = [activate, deactivate, delete];
    actors.user.actions.user = [invite, message, report];
    actors.user.actions.admin = [resolve, deactivate, remove];

    collections.circle.actions.user = []

    collections.circle.state = [conceive, register, publish, 
                               unpublish, deactivate, remove, delete];

    dataTypes.circles.publicPrivileges = [see, invite, request => 'invite', confirm => invite, deny => 'invite'];
    
    dataTypes.circles_content.state = []
    dataTypes.circles_content.publicPrivileges = [encircle, reflect, value, report]

    dataTypes.circles_commoners.state = [s.member, register, activate, deactivate, remove];

    */