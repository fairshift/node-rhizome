//
// Types — schema list
//
export { NodeState }


const Node = {
  node_id:      ['!', 'number', (value) => { return value > 0 }],
  line_id:      ['!', 'number', 0],
  language_id:  ['number', 1, 3],
  main_line_id: ['!', 'number', 0]
}


const stateRelations = {
	table: 'relations',
	...root_line_id,
	...tie_line_id,
//... and definitions of relations external to a given node 
//	 (specific to a generated table)
}


const NodeState = () => { return {
	table: 'rzState',
	id: 'stateId',
	index: [],
// Contains:
	node: nodeRhizomeDef,
	rhizome: stateRelations,
	actions: {
//	... generated action fields here
//	... timestamps here
	},
	validation: {
		statechain: {
//		...
		},
// ... hashes here
// ^^^ by granularity, desc: eventchain, nodechain, leapchain

// ... signatures here
//	^^ by creating user_id, circle of entities & users
	},
//	... extended with database object fields
} }


const manifestedState = () => { return {
	tableRoot: 'rzManifested',
} }

const cachedRhizome = () => { return {

} }