/*

  # Collection: Needs
  - Tree structure of need definitions, rooted in basic needs

*/

collections.need.schema = { 

};
collections.need.node_rhizome = ['rights', 'rhizome', 'tree'];
collections.need.actions = [actions.platform.create, 
                    				actions.platform.publish, actions.platform.unpublish, 
                    				actions.platform.remove];


/*

  # Collection: Resorces
  - Tree structure of resource definitions

*/

collections.resource.schema = { 

};
collections.resource.node_rhizome = ['rights', 'rhizome', 'tree'];


collections.resource_type.schema = {
	
};
collections.resource_type.node_rhizome = ['privileges', 'rhizome', 'tree'];


collections.resource_unit.schema = {

}
collections.resource_unit.node_rhizome = ['privileges', 'rhizome', 'tree'];


collections.resource.node_rhizome = ['rights', 'rhizome', 'tree'];
collections.resource.node_rhizome.actions = [actions.platform.create, 
                            							 	 actions.platform.publish, actions.platform.unpublish, 
                            							 	 actions.platform.remove];

/*

  # Collection: Gestures
  - Symbols of patterns, emerging from recurring (inter)actions and behaviours

*/

collections.gesture.schema = { //templates, which can be personalized to a specific occasion

};
collections.gesture.node = ['privilege', 'rhizome'];

/*

  # Collection: Leap gestures - change in habits 

	Question: does "leap" fit better in node_stem?

*/
//collections.gesture_leap.schema = {}; 


/*

  # Collection: Values
  - Words which are meaningful upon truthfully reflecting shared, interpersonal experiences

*/

collections.value.schema = { // Tree structure of value keywords

};
collections.value.node = ['privileges', 'rhizome', 'tree'];

collections.value_observable.schema = {
  // Collection of parameters, community-proposed metrics for measuring a certain effort / impact, tied to values

  // Value_model_contract: 'node', //collection of user-defined contracts
  // Example contract: when a condition is met, words used by a given person / entity are replaced or auto-corrected
};
collections.value_observable.node = ['privileges', 'rhizome'];



/*

  # Collections: What we need, what we can offer, what we value (appreciate)

*/

collections.agency_need.schema = {} //list of needs - tagged resources or descriptive; present and past / recurring
collections.agency_need.node_rhizome = [];

collections.agency_resource.schema = {}; // Pool of disclosed resources, governed by this agency
collections.agency_resource.node_rhizome = [];

collections.agency_value.schema = {}; // Values we care of (enacted and appreciated),
                                      // narrowing in on preferred ways of doing
collections.agency_value.node_rhizome = [];
 

/*

  # Collection: Gestures
  - Desired scenarios - descriptions of recurring patterns (activities and flowing resources)

*/

collections.agency_gesture.schema = {}; 
collections.agency_gesture.node_rhizome = ['multilingual', 'rhizome'];

collections.agency_gesture_resource.schema = {}; // Typical / average flow of resources
collections.agency_gesture_resource.node_rhizome = ['multilingual', 'rhizome'];

collections.agency_gesture_transaction.schema = {}; // Contains a set of transactions
collections.agency_gesture_transaction.node_rhizome = ['multilingual', 'rhizome'];

/*

  # Collection: Transactions
  - Occurence of a gesture or its variant - a transaction
  - Flow of ... among giving and receiving entities (meta data of an act of sharing)

*/

collections.agency_transaction.schema = {};
collections.agency_transaction.node_rhizome = ['multilingual', 'reflections'];

// Resources and energies, which flowed while sharing
collections.agency_transaction_resource.schema = {}; 
collections.agency_transaction_resource.node_rhizome = [];

// Needs, fulfilled with this gesture
collections.agency_transaction_need.schema = {};
collections.agency_transaction_need.node_rhizome = [];

// Reflected, enacted values (describing intangibles)
collections.agency_transaction_value.schema = {};
collections.agency_transaction_value.node_rhizome = [];


/*

  # Vision, objectives and mission by example (gestures)
  - Planning ahead, defining objectives (target goals) and measurables

*/

// A formalized vision of future state
collections.agency_vision.schema = {};
collections.agency_vision.node_rhizome = ['multilingual', 'reflections', 'rhizome'];

// Objectives a person or an organization sets for manifesting envisioned future
collections.agency_objective.schema = {};
collections.agency_objective.node_rhizome = ['multilingual', 'reflections', 'rhizome'];

// A reflected good practice, representing a reached goal
//(can be experienced by peers outside of a given circle)
collections.agency_objective_gesture.schema = {};
collections.agency_objective_gesture.node_rhizome = [];

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
collections.agency_metric.node_rhizome = [];

collections.agency_metric_source.schema = {}; // Pointers to data, stored in local database or external service API
collections.agency_metric_source.schema = [];

collections.agency_metric_data.schema = {}; // Time-series of collected data
collections.agency_metric_data.node_rhizome = [];

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
collections.agency_attribution.node_rhizome = {};


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