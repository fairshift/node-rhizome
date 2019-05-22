//import { property, constant } from 'lodash';

import {actionDefinitions} from 'graphql.actions';

export schema = function($collectionFragments){

return [`

type Node {
  id: String!
  data_provider: String
  collection: String
  document_id: String

  current_state_id: String

  statechain_count: Int

  # Current data state in requested language(s)
  state(language_code: String, language_codes: String): [State]

  # Drafts currently in works
  drafts(language_code: String, language_codes: String): [Draft]

  # History of data states
  statechain(
    # Language code (ISO 639-1 Code)
    language_code: String

    # The number of items to skip, for pagination
    offset: Int

    # The number of items to fetch starting from the offset, for pagination
    limit: Int
  ): [State]
}



# State type needs custom Fragments to implement various types of data that can be stored in application's database
type State {
  id: String
  timestamp: Int
  language_code: String
  machine_translation_provider: String

  # Manifested state - if user can view
  data: Data

  # Open requests to translate and bridge languages
  translate_requests: [TranslateRequest]
  translate_requests_count: Int

  # Rhizome
  rhizome: [Rhizome]

  # Data node, categorized in a tree
  # tree: Tree - !!! revise

  # List of events, contributing to this data state
  events: [EventSource]
  events_count: Int

  # State was signed by following people and groups (agents)
  # signed: [Signed]
  # signed_count: Int

  statechain_hash: String

  # statechain_hash_ethereum: String (stored with Ethereum's web3.js client) - !!! revise
  # Past manifested states could be modified and rehashed, until stored on an external, immutable storage medium
  # http://ethdocs.org/en/latest/contracts-and-transactions/accessing-contracts-and-transactions.html

  # List of related data nodes (!!! revise - could also be implemented within above types)
  # related(language_code: String): [Node]
}

# Draft type needs custom Fragments to implement various types of data that can be stored in application's database
type Draft {
  id: String
  timestamp: Int
  language_code: String
  machine_translation_provider: String

  # Draft state - if user can view
  data: Data

  # Rhizome
  rhizome: [Rhizome]

  # Data node, categorized in a tree
  tree: Tree

  # List of events, contributing to this data state
  events: [EventSource]
  events_count: Int

  # State was signed by following people and groups (agents)
  signed: [Signed]
  signed_count: Int
}

type Data {
  ${collectionFragments}
}



type TranslateRequest {
  from_language_code: String
  to_language_code: String
}



type EventSource {
  timestamp: Int
  signed: [Agent]
  action: String

  added: [FieldValue]
  modified: [FieldDifference]
  removed: [Field]

  eventchain_hash: String
}

type FieldValue {
  field: String
  value: String
}

type FieldDifference {
  field: String
  difference: String
  levensthein: Int
}

type Field {
  field: String
}



# Rhizome - data node's map of relations within plurality of co-evolving contents 
type Rhizome {
  node_id: String
  state_id: String

  relation: [RelationType]!
  related_nodes: [Node]!
  related_count: Int

  # Could this structure embody various relations among data, including cause and effect?
  # No - database schemas are designed to serve this purpose, already - without needing to learn another layer
  # Yes - could be a unifying layer among various DB schemas (structures of data nodes and relations),
  #       transpiling data into a predefined format
}



type Tree {
  synsets: [Synset]
}

type Synset {

  # Can one node reside in many trees? type: TreeType (!!! revise)

  hypernym: Hypernym
  synonyms: [Synonym]
}

type Hypernym {

}

type Synonym {

}

`];

};

export const resolvers = {
  Node: {
    repository({ repository_name }, _, context) {
      return context.Repositories.getByFullName(repository_name);
    },
    createdAt: property('created_at'),
  },
  Comment: {
    createdAt: property('created_at'),
    postedBy({ posted_by }, _, context) {
      return context.Users.getByLogin(posted_by);
    },
  },
};
