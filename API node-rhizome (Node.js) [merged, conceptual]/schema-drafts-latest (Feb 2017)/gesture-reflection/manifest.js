
// #  Q:   How readable is this manifest file?
//     A: [Now you go]

// #  Q:   And after you've seen it in a code editor (eg. Sublime Text),
//        with 1 tab = 2 spaces setting?
//       (default might be 1 : 4 - screens are smaller these days, though)

// ...     There's some ambiguity with code marked with [!!!]
//        -> decision making process is positioned after the rest of code


//
//////

import { Platform, Imported, Offline } from './rhizome.actions'
/* List of possibilities to read and write to state of data points
  (when disabled for a collection, rules of data manipulation can be defined elsewhere in application) */
//
// ... possibly compatible with Redux JS state management library on Frontend
/*     Let's see (at the end of file) ... */

import Rz from './rhizome.augment'

//////

import { Abbr } from 'jsonion'
import _ from 'lodash'

//////
//




/*

  # Patterns as generalized definitions (freeing unnecessary space in code)

*/
const Recurring = () => { var rec = {
  actions: {
    A: [ // List head
      Platform.create, 
      Platform.publish, Platform.unpublish
    ],
    Z: [ // List foot
      Platform.remove
    ]
  },
  augmentations: {
    A: [ Rz.rhizome, Rz.tree ],
    M: [ Rz.highlights ],
    Z: [ Rz.rights ]
  },
  relations: [ // [!!!] This will need more work (indexes)
    'id',
    'node_id, table_id'
  ]
}, // Shorthand full list (generated): rec.actions.all, rec.augment.all
rec.actions.all = [...rec.actions.A, ...rec.actions.Z],
rec.augmentations.all = [...rec.augmentations.A, ...rec.augmentations.Z]

return  rec };
//     \ ˇ /
const   Rec = Abbr(recurring, {

  // List of abbreviations for quicker access while writing manifest file
  //(defined from within of the object tree)
  A: 'a', M: 'm', Z: 'z', // [!!!]
  actions: 'act', augmentations: 'augm', relations: 'rel'

}) // Use 'recurring' or 'rec' (abbreviated keys)





export default const collections = () => { var collections = {} // <- ES2016 fnc


//
// ////    ///
// Gesture-Reflection module definitions
//     /// (with Node-rhizome)         7
//


/*

  # Collection: Needs
  - Tree structure of definitions, rooted in basic needs 
   (later in overlapping with "wishes", "urges", "desires", "demands")

*/

collections.need = {
  'schema': {},
  'augment': Rec.augm.all, 'actions': Rec.act.all
}
// \/\ */
//



/*

  # Collection: Resorces
  - Tree structure of resource definitions

*/

collections.resource = {
  'augment': Rec.augm.all,
  'actions': Rec.act.all
}

collections.resource_type = {
  'schema': {},
  'actions': Rec.act._,
  'augment': [ Rz.privileges, ...rec.augm.a  ]
}

collections.resource_unit = {
  'schema': {},
  'actions': Recurring.actions.all,
  'augment': [ Rz.privileges, ...rec.augm.a  ]
}


collections.resource = { // Link up above collections
  'schema': {
    resource_type: ['./link-to/schema.json#internalRef', Rec.rel],
    resource_unit: ['./link-to/simplSchema.js#exportedVar', Rec.rel]
  },

  ...collection.resource, // <- repeat main resource

// # Add related data structures:
  ...collection.resource_unit,
  ...collection.resource_type

}
// \/\ */
//



/*

  # Collection: Gestures
  - Symbols of patterns, emerging from recurring (inter)actions and behaviours
    ... 
*/

collections.gesture = { // Templates, personalized to a specific occasion
  'actions': recurring.actions.all,
  'augment': [ Rz.privileges, Rz.rhizome ]
}
// \/\ */
//
/*

  Leap Gestures - a gesture becomes a leap when habits change
  Question: does a 'leap' fit in node_stem,
            as a 'milestone' / 'pointer' in content evolution flow?

*/



/*

  # Collection: Values
  - Words which are meaningful upon truthfully reflecting shared, interpersonal experiences

*/

collections.value = { // Tree structure of value keywords
  'actions': recurring.actions.all,
  'augment': [ Rz.privileges, Rz.multilingual, Rz.rhizome, Rz.tree ]
}

collections.value_observable = {
  // Metrics for measuring a certain effort / impact, tied to values
  // ... derived from a certain community of [...]

  'actions': recurring.actions.all,
  'augment': [ Rz.privileges, Rz.multilingual, Rz.rhizome, Rz.tree ]
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          


// ... Something to think through  \ /
//                                  /
collections.value_model_contract = {} /* Defined contracts
  
  # For example:

  - when a condition is met, words used by a given person / entity are 
    replaced by auto-correct
    or open for editing anew

*/
// \/\ */
//



/*

  # Collections: What we need, what we can offer, what we value (appreciate)

*/

collections.agency_need = { // List of needs (all-time ; recurring higher)
                            // ... descriptive or tagged (referenced by ID)
}

collections.agency_resource = { // Pool of disclosed resources
  // Governed by entities (a group of people & circles) with defined agency
}; 

collections.agency_value = { 
// Values we care of (enacted and appreciated),
// narrowing in on preferred ways of doing
}; 
                                      
 

/*

  # Collection: Gestures
  - Desired scenarios - descriptions of recurring patterns (activities and flowing resources)

*/

collections.agency_gesture = {
 'augment': [Rz.multilingual, Rz.rhizome]
}

collections.agency_gesture_resource = { // Typical / average flow of resources
 'augment': [Rz.multilingual, Rz.rhizome]
}

collections.agency_gesture_transaction = { // Contains a set of transactions
 'augment': [Rz.multilingual, Rz.rhizome]
};



/*

  # Collection: Transactions
  - Occurence of a gesture or its variant - a transaction
  - Flow of ... among giving and receiving entities (meta data of an act of sharing)

*/

collections.agency_transaction = {
  'actions': Rec.actions.all,
  'augment': [Rz.multilingual, Rz.reflections]
}

// Resources and energies, which flowed while sharing
collections.agency_transaction_resource = {}

// Needs, fulfilled with this gesture
collections.agency_transaction_need = {}

// Reflected, enacted values (describing intangibles)
collections.agency_transaction_value = {}



/*

  # Vision, objectives and mission by example (gestures)
  - Planning ahead, defining objectives (target goals) and measurables

*/

// A formalized vision of future state
collections.agency_vision = {
  'actions': Rec.actions.all,
  'augment': [Rz.multilingual, Rz.reflections, Rz.rhizome]
}

// Objectives a person or an organization sets for manifesting envisioned future
collections.agency_objective = {
  'actions': Rec.actions.all,
  'augment': [Rz.multilingual, Rz.reflections, Rz.rhizome]
}

// A reflected good practice, representing a reached goal
//(can be experienced by peers outside of a given circle)
collections.agency_objective_gesture = {}



/*  
  
  Defined metrics, a set of quantifiable points 
  of observation; parameters revealing clues on assumed factors (causes)

  Enabling informed decisions to reach goals by using metrics, 
  key to core and supporting activities, while (in)validate assumptions
  about community resources, needs and preferrences (values) - using data:
    - measuring inputs (work; resources; ...),
    - ways of undertaking activities (relationships; alternatives; ethics; ...),
    - outcomes (fruits; impacts; satisfaction; harms; ...)

  Hereby defined:
    - approximated weighs among metrics, attributing to causing factors
      - frequency of measurement / fetching data from sources 

*/

collections.agency_metric = {}
collections.agency_metric_source = {} // Pointers to data, stored in local database or external service API
collections.agency_metric_data = {}   // Time-series of collected data

/* ^^^  Weighs (relative ratios) among various objectives and metrics (factors) are 
    taking into account known (interpreted) causes and attributing to them a level of importance
    
    Causality is iteratively attributed while contemplating at various occasions, 
    reflecting upon experiences in a given context

    Example sentences in Slovene dialects and slangs:
    - "nje nimam tko rad k tebe" (qualitative difference)
    - "nje nimam tok rad k tebe" (quantitative difference)
    - "nje nimam tk rad k tebe"  (ambiguous difference, can be both qualitative or quantitative)
*/



/* 
  # Collection: Attribution

  Within and beyond organizational borders,
    people of formal and informal organizations who are part of a cause,
    are leaving volumes of trails in data, impacts, which could be attributed to them as a currency
*/

collections.agency_attribution = {}

// \/\ */
//



/*

  # Collection: Units
  - Units of measurement

  (attach a versioning process to establish new agreements, using +rhizome)

*/

collections.unit = {
  // Example: unit of (time or energy) used to form an (object and/or experience)
  augment: [Rz.privileges, Rz.multilingual]
}

collections.unit_conversion = { 
  // Ratios among related units (synonyms of different multitudes)
  augment: [Rz.privileges, Rz.multilingual]
}

// \/\ */
//



/*

  # Collection: Places and residents

*/

collections.place = { 
  // List of places at locations
  augment: [Rz.privileges, Rz.multilingual, Rz.rhizome]
}

collections.place_entity = {
  // People and organizations, residing in those places
  augment: [Rz.privileges, Rz.multilingual, Rz.rhizome]
};

// \/\ */
//



/*

  # Collection: Events / campaigns at (multiple) locations behave as portals into this online medium

*/

collections.portal = {
  augment: [Rz.privileges, Rz.multilingual, Rz.rhizome]
}

collections.portal_place = {
  augment: [Rz.privileges, Rz.multilingual, Rz.rhizome]
}

// \/\ */
//

return collections }




//
//   [!!!]
/* 

  # Rethink patterns:


//  const   Rec = Abbr(recurring, {
//  ...
//  A: 'a', M: 'm', Z: 'z', all: ['_'], // [!!!]

  - [ ] as array of available keys, including original object key?
  - use object extension which enables internal references?



    # -> Can it stand for a numeric index of oneToMany relation type?
         eg. when remapping a schema, finding objects in arrays


*/




//
// Redux linked with 'rhizome.actions'

// 1) Action namespace definition (constant)
export const AUTH_SET_FROM_COOKIE = 'boilerplate/App/AUTH_SET_FROM_COOKIE';

// 2) The initial state of the App
const initialState = fromJS({
  auth: {
    token: '',
    time_registered: -1,
    // ...
  }
  // ...
})

// 3) Reducer object - action, dispatched to refresh application state
export default const appReducer = (state = initialState, action) => {
  switch (action.type) {

    case AUTH_SET_FROM_COOKIE:
      return state
        .setIn(['auth', 'token'], action.token)
        .setIn(['auth', 'time_registered'], action.time_registered)
  }
}

// 4) Action to function binding - receives data from 3rd step
export function setAuthFromCookie(token, time_registered) {
  // ... some code here
  return {
    type: AUTH_SET_FROM_COOKIE,
    token, time_registered
  };
}

// 5) Redux single of source of truth, injecting data to React components tree
export default function createReducer(injectedReducers) {
  return combineReducers({
    client: clientReducer,
  });
}

// 6) Reselect module, which serves data to React JS components, upon call
const selectClient = state => state.get('client');
const makeSelectAuthToken = () => 
  createSelector(selectClient, state => 
    state.getIn(['auth', 'time_registered']));

// ... and an actual component (NavigationBar) with data state from Redux
const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuthToken(),
});
const withConnect = connect(
  mapStateToProps,
);
export default compose(
  withConnect
)(NavigationBar)


//
/* Overlapping of 'rhizome.actions' and 'redux' design patterns


Data state (fields) influenced - eg. by action: register -> REGISTER
-> time_registered, etc
... At this time it is usually maintained on server and frontend seperately,
    with exceptions of some monolithic frameworks
... GraphQL (which has a very talkative and informative interface)
    is happily using this specific, so that UX/UI designers and coders
    know which data fields are available, while in their workflow

Function name - eg. frontend setAuthFromCookie() and backend functions
... can be left unaligned in case of front-end (JS) and backend (PHP)
... code-sharing among frontend and backend is a ./common/ practice with JS

Action name (lower-case, camelCase) - eg. AUTH_SET_FROM_COOKIE
... can be transformed to UPPERCASE constant style (must match)


*/
// ... so if any functions are used for automatic transformation of variable names
//     these could be used with redux
// eg. instead of 'time_registered' <- Platform.register.toState()
//
// \/\ */
//
//
// I'm here to help you. Good bye.
//