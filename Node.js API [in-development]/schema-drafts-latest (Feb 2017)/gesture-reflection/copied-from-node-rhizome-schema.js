// Type 'reflections': enables commenting contents, giving ability to attach reflected realities during evolving

		const reflection = {

		  sql: { 
		  	node_id: String,
		  	branch_id: Integer
		  },

		  state_id: Integer,

		  eventsWithFields: [actions.platform.create, actions.platform.remove,
					  		 actions.platform.mutate],

		  events: [actions.platform.delete]
		};

// Type 'references': enables referencing contents (attachments)

		const reference = {

		  sql: { 
		  	node_id: String,
		  	branch_id: Integer
		  },

		  state_id: Integer,
		  
		  pointer_field: String,
		  pointer_fulltext: Integer,

		  eventsWithFields: [actions.platform.create, actions.platform.remove],

		  events: [actions.platform.delete]
		};

// Type 'reports': enables reporting inappropriate contents, falsifying invalid data - both in accord with specific circles

		const report = {

		  eventsWithFields: [actions.platform.create, 
		  					 actions.platform.resolve, actions.platform.close,
		  					 actions.platform.remove],

		  events: [actions.platform.delete]
		};