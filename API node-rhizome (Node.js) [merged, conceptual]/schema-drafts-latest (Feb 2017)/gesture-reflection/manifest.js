
// #	Q: 	How readable is this manifest file?
// 		A: [Now you go]

// #	Q: 	And after you've seen it in a code editor (eg. Sublime Text),
//				with 1 tab = 2 spaces setting?
//			 (default might be 1 : 4 - screens are smaller these days, though)

// ... 		There's some ambiguity with code marked with [!!!]
//				-> decision making process is positioned after the rest of code


//
//////

import { Platform, Imported, Offline } from './rhizome.actions'
/* List of possibilities to read and write to state of data points
  (when disabled for a collection, rules of data manipulation can be defined elsewhere in application) */

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
		A: [ 	// List head
		  Platform.create, 
		  Platform.publish, Platform.unpublish
		],
		Z: [	// List foot 
			Platform.remove
		]
	},
	augmentations: {
		A: [ Rz.rhizome, Rz.tree ],
		Z: [ Rz.rights ]
	},
	relations_sqlDB: [ // [!!!]
		'id',
		'node_id, table_id'
	]
}, // Shorthand full list (generated): rec.actions.all, rec.augment.all
rec.actions = _.merge(rec.actions.A, rec.actions.Z),
rec.augmentations.all = _.merge(rec.augmentations.A, rec.augmentations.Z)

return	rec };
//		 \ ˇ /
const 	Rec = Abbr(recurring, {

	// List of abbreviations for quicker access while writing manifest file
	//(defined from within of the object tree)
	A: 'a', Z: 'z', // [!!!]
	actions: 'act', augmentations: 'augm', relations_sqlDB: 'dbRel'

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
		resource_type: ['./link-to/schema.json#internalRef', Rec.ďbRel],
		resource_unit: ['./link-to/simplSchema.js#exportedVar', Rec.dbRel]
	},

	...collection.resource, // <-		repeat main resource

// # Add related data structures
//(# -> numeric index of oneToMany relation type):
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
//																  /
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

collections.agency_transaction.schema = {};
collections.agency_transaction.rzAugment = ['multilingual', 'reflections'];

// Resources and energies, which flowed while sharing
collections.agency_transaction_resource.schema = {}; 
collections.agency_transaction_resource.rzAugment = [];

// Needs, fulfilled with this gesture
collections.agency_transaction_need.schema = {};
collections.agency_transaction_need.rzAugment = [];

// Reflected, enacted values (describing intangibles)
collections.agency_transaction_value.schema = {};
collections.agency_transaction_value.rzAugment = [];


/*

  # Vision, objectives and mission by example (gestures)
  - Planning ahead, defining objectives (target goals) and measurables

*/

// A formalized vision of future state
collections.agency_vision.schema = {};
collections.agency_vision.rzAugment = ['multilingual', 'reflections', 'rhizome'];

// Objectives a person or an organization sets for manifesting envisioned future
collections.agency_objective.schema = {};
collections.agency_objective.rzAugment = ['multilingual', 'reflections', 'rhizome'];

// A reflected good practice, representing a reached goal
//(can be experienced by peers outside of a given circle)
collections.agency_objective_gesture.schema = {};
collections.agency_objective_gesture.rzAugment = [];

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
collections.agency_metric.schema = {};
collections.agency_metric.rzAugment = [];

collections.agency_metric_source.schema = {}; // Pointers to data, stored in local database or external service API
collections.agency_metric_source.schema = [];

collections.agency_metric_data.schema = {}; // Time-series of collected data
collections.agency_metric_data.rzAugment = [];

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

collections.agency_attribution.schema = {};
collections.agency_attribution.rzAugment = {};

// \/\ */
//



/*

  # Collection: Units
  - Units of measurement

  (attach a versioning process to establish new agreements, using +rhizome)

*/

collections.unit.schema = { // Example: unit of (time or energy) used to form an (object and/or experience)

};
collections.unit.node = ['privileges', 'multilingual'];

collections.unit_conversion.schema = { // Ratios among related units (synonyms of different multitudes)

};
collections.unit_conversion.node = ['privileges', 'multilingual'];

/*

  # Collection: Places and residents

*/

collections.place.schema = { // List of places at locations

};
collections.place.node = ['privileges', 'multilingual', 'rhizome'];

collections.place_entity.schema = { // People and organizations, residing in those places

};
collections.place_entity.node = ['privileges', 'multilingual', 'rhizome'];

/*

  # Collection: Events / campaigns at (multiple) locations behave as portals into this online medium

*/

collections.portal.schema = {

};
collections.place_entity.node = ['privileges', 'multilingual', 'rhizome'];

collections.portal_place.schema = {

};
collections.portal_place.node = ['privileges', 'multilingual', 'rhizome'];



//
// 	[!!!]
/* 

	# Rethink patterns:


//	const 	Rec = Abbr(recurring, {
//	...
//	A: 'a', Z: 'z', all: ['_'], // [!!!]

	- [ ] as array of available keys, including original object key?
	- use object extension which enables internal references?


*/