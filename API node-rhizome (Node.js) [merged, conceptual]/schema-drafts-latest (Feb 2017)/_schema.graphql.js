//import { property, constant } from 'lodash';

import {}

export const schema = [`

type Node {
  id: Int!
  collection: String

  # Recent data state in a requested language
  state: RecentState

  # List of requests to help translate among languages
  translateRequests(from_language_code: String, to_language_code: String): [TranslateRequest]

  # History of manifested data states
  statechain(

    # 
    published: Boolean,

    # 
    hashed: Boolean,

    # The number of items to skip, for pagination
    offset: Int,

    # The number of items to fetch starting from the offset, for pagination (limit -1 returns all)
    limit: Int

  ): [State]

  # Rhizome
  rhizome: [Rhizome]

  # Data node, categorized in a tree
  tree: Tree

  # List of contained data nodes (!!! revise if above type schemas produce too much overhead)
  # contained: [Node]
}



type State {
  node_id: Int
  document_id: Int
  language_code: String

  # Manifested state - if user can view (published? !!! revise)
  manifested: Manifested

  # Draft currently in works - if user can edit
  draft: Draft
}

# This schema needs to be customized with Fragments, depending on types of data that can be stored in application's database
type Manifested {
  id: Int
  timestamp: Int
  machine_translation: Boolean

  ${collectionFragments}

  signed: [Signed]
  events: [EventSource]

  statechain_hash: String

  # (!!! revise) ethereum_record_id: String (something like this, stored through Ethereum's web3.js client)
  # http://ethdocs.org/en/latest/contracts-and-transactions/accessing-contracts-and-transactions.html
}

# This schema needs to be customized with Fragments, depending on types of data that can be stored in application's database
type Draft {
  id: Int
  timestamp: Int
  machine_translation: Boolean

  ${collectionFragments}

  signed: [Signed]
  events: [EventSource]
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

  relation_type: [RelationType]!
  related_nodes: [Node]!
  related_count: Int

  node_id: Int
  state_id: Int

  # Could this structure embody various data relations - such as cause and effect?
  # No - database schemas are designed to serve this purpose, already - without needing to learn another layer
  # Yes - could be a unifying layer among various DB schemas (structures of data nodes and relations),
  #       transpiling data into an understandable format

  # Could this structure 
}

type RelationType {


  # Translations of a data node
  TRANSLATION

  # Attributed its immediate roots in a related data node
  STEM

  # Merged into a related data node
  MERGED

  # Attributed its origin to a related data node
  ROOT

  # Declaration of its main branch
  MAIN

  # Mirroring another data node
  # MIRROR

  # Has recognized effects of a related data node
  # CAUSE

  # Has recognized its effect to a related data node
  # EFFECT
}


type Tree {
  root: Node

  hypernyms: [Hypernym]
  synsets: [Synset]

  # (!!! revise) type: TreeType
}

type Synset {
  hypernym: Hypernym
  synonyms: [Synonym]
}

type Synonym {

}

type Hypernym {

}

# enum RelationType {
  # Types (!!! revise)
# }
# enum TreeType {
  # Types (!!! revise)
# }


`];

export const resolvers = {
  Rhizome: {
    repository({ repository_name }, _, context) {
      return context.Repositories.getByFullName(repository_name);
    },
    postedBy({ posted_by }, _, context) {
      return context.Users.getByLogin(posted_by);
    },
    comments({ repository_name }, { limit = -1, offset = 0 }, context) {
      return context.Comments.getCommentsByRepoName(repository_name, limit, offset);
    },
    createdAt: property('created_at'),
    hotScore: property('hot_score'),
    commentCount({ repository_name }, _, context) {
      return context.Comments.getCommentCount(repository_name) || constant(0);
    },
    vote({ repository_name }, _, context) {
      if (!context.user) return { vote_value: 0 };
      return context.Entries.haveVotedForEntry(repository_name, context.user.login);
    },
  },

  Comment: {
    createdAt: property('created_at'),
    postedBy({ posted_by }, _, context) {
      return context.Users.getByLogin(posted_by);
    },
  },
};
