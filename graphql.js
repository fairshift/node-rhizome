// Export these fragments of Queries, Mutations and Subscriptions to root GraphQL schema definitions

export const schema = [`

type QueryNodeRhizome {

  # Query state or draft of a specific data node
  state(

    # Return draft? (True, False)
    draft: Boolean,

    # Find by node_id - returns most recent state
    node_id: Int,

    # Find by collection name and document_id - returns most recent state
    collection: String,

    # Find by collection name and document_id - returns most recent state
    document_id: String,

    # Find by a specific state_id
    state_id: Int,

    # Find content in specified languages (eg. 'en,sl,de'), returns first language available
    language_code: String,

    # Find content in any of the following languages (eg. 'en,sl,de'), returns all available languages
    language_codes: String

  ): State

  # Rhizome - data node, mapped in a rhizome, within plurality of co-evolving contents
  rhizome(

    # Find by node_id - returns most recent state
    node_id: Int,

    # Find by collection name and document_id - returns most recent state
    collection: String,

    # Find by collection name and document_id - returns most recent state
    document_id: String,

    # Find by a specific state_id
    state_id: Int,

    # Find content in specified languages (eg. 'en,sl,de' - ISO 639-1 Code) - returns first language available
    language_code: String,

    # Find content in any of the following languages (eg. 'en,sl,de' - ISO 639-1 Code) - returns all available languages
    language_codes: String,

    # The number of items to skip, for pagination
    offset: Int,

    # The number of items to fetch starting from the offset, for pagination (limit -1 returns all)
    limit: Int

  ): Rhizome

  # Data node, categorized in a tree
  tree(

    # Find by node_id - returns most recent state
    node_id: Int,

    # Find by collection name and document_id - returns most recent state
    collection: String,

    # Find by collection name and document_id - returns most recent state
    document_id: String,

    # Find by a specific state_id
    state_id: Int,

    # Find content in specified languages (eg. 'en,sl,de' - ISO 639-1 Code), returns first language available
    language_code: String,

    # Find content in any of the following languages (eg. 'en,sl,de' - ISO 639-1 Code) - returns all available languages
    language_codes: String,

    # The number of items to skip, for pagination
    offset: Int,

    # The number of items to fetch starting from the offset, for pagination (limit -1 returns all)
    limit: Int

  ): Tree

  # Events, which modified a specific data state or a draft (hashed)
  events(

    # Return draft? (True, False)
    draft: Boolean,

    # Find by node_id - returns most recent state
    node_id: Int,

    # Find by collection name and document_id - returns most recent state
    collection: String,

    # Find by collection name and document_id - returns most recent state
    document_id: String,

    # Find by a specific state_id
    state_id: Int,

    # Find content in specified languages (eg. 'en,sl,de' - ISO 639-1 Code), returns first language available
    language_code: String,

    # Find content in any of the following languages (eg. 'en,sl,de' - ISO 639-1 Code) - returns all available languages
    language_codes: String,

    # The number of items to skip, for pagination
    offset: Int,

    # The number of items to fetch starting from the offset, for pagination (limit -1 returns all)
    limit: Int

  ): [EventSource]

  # History of manifested data states (hashed and possibly stored externally for validation)
  statechain(

    # Find by node_id - returns most recent state
    node_id: Int,

    # Find by collection name and document_id - returns most recent state
    collection: String,

    # Find by collection name and document_id - returns most recent state
    document_id: String,

    # Find content in specified languages (eg. 'en,sl,de' - ISO 639-1 Code), returns first language available
    language_code: String,

    # Find content in any of the following languages (eg. 'en,sl,de' - ISO 639-1 Code) - returns all available languages
    language_codes: String,

    # The number of items to skip, for pagination
    offset: Int,

    # The number of items to fetch starting from the offset, for pagination (limit -1 returns all)
    limit: Int

  ): [State]
}

type MutateNodeRhizome {

  stemNode(): Node
}

type SubscribeNodeRhizome {
  
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
