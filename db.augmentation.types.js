//
// Augmentation patterns - objects per node-rhizome collection type
// - _gql defaults (views and short-hand thereof)
// - SQL query abstraction
//


// NodeState table type dependencies imports
import { NodeState } from './types/nodeState'
import { NodeStatechain } from './types/validation'
import { 
  getStateByLanguages, getLine, getManifestedState,
} from 'sql.queries'

// Validation tables ...
import { Eventchain, Leapchain } from './types/validation'


// Functions declared in this document
export {
  NodeState_gql,
  
}


//
// NodeState augmentation
//

const NodeState_gql = () => {

  // ${namespace}_gql: responders define views 
  // based on permissions (defaults are set here)

  var views = [
    '#obj',
    'actions',
    'rhizome',
    'eventchain',
    'statechain',
    'leapchain'
  ]

  var shorthand = {
    verity: ['eventchain', 'statechain', 'leapchain'],
  }
    
  return getNodeStates
}


const getNodeStates = () => { return {
  __defaultType: NodeState,
  byLanguage: {
    'O': getStateByLanguages,
    'i': __,
    'v': ['#obj', 'rhizome', 'signatures', 'actions'],
    rYz: []
  },
  manifestedState: {
    'O': getManifestedState,
    'i': [NodeState_db, ]
    'v': ['#obj', 'rhizome', 'signatures', 'actions'],
    rYz: []
  },
} }


// Validation types

