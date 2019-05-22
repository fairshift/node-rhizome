

export {
  stateRelations
}

// Available types 
// [!!! Define type-specific keys]
// [!!! Code fn() to add keys dynamicly]
const = relTypes = [

// contained:
STEM,
ROOT, MERGED,
SYNONYM, HYPERNYM, HYPONYM, ANTONYM,

// external references
ONE_TO_MANY,
ONLINE_PUBLIC, ONLINE,
OFFLINE
]


const stateRelations = {
  table: 'relations',
  type: { oneOf: relTypes },
  root_line_id: ['!', 'number', 0, ],
  tie_line_id:  ['!', 'number', 0, ],
  mergeIn: {
    relTypes: {}
  }
//... Type-specific fields merge here
}