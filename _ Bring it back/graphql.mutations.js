//import { property, constant } from 'lodash';

export const schema = [`

type Node {
  id: Int!

  # Recent data state in a requested language
  state(language_code: String): RecentState

  # Requests to help translate into a certain language
  helpTranslate(from_language_code: String, to_language_code: String): [TranslateRequest]

  # History of data states
  statechain(
    # Language code (ISO 639-1 Code)
    language_code: String

    # The number of items to skip, for pagination
    offset: Int

    # The number of items to fetch starting from the offset, for pagination
    limit: Int
  ): [State]

  # Events, modifying data state
  events(language_code: String, state_id: Int, draft_id: Int, offset: Int, limit: Int): [EventSource]

  # Rhizome
  rhizome(language_code: String, offset: Int, limit: Int): Rhizome

  # Data node, categorized in a tree
  tree(language_code: String, offset: Int, limit: Int): Tree

  # List of related data nodes (!!! revise - could also be implemented within above types)
  related(language_code: String): [Node]
}



type State {
  node_id: Int
  language_code: String

  # Manifested state - if user can view
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
  modified: [FieldMutationDiff]
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



type Rhizome {
  # Where data node stemmed from (undefined when it didn't stem)
  stem_node_id: Int
  stem_state_id: Int

  # Which data node was defined as main branch, if any (perhaps intending to merge its contents there)
  main_branch_node_id: Int
  main_branch_state_id: Int

  branch_root: [BranchRoot]
  branch_merge: [BranchMerge]
}

type BranchRoot {
  state_id: Int
  root_node_id: Int
  root_state_id: Int
}

type BranchMerge {
  state_id: Int
  merge_node_id: Int
  merge_state_id: Int
}



type Tree {
  tree_hypernym: [Hypernym]
  tree_synset: [Synset]
}

type Hypernym {

}

type Synset {

}

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
