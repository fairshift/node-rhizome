//import { property, constant } from 'lodash';

export const schema = [`

enum RelationType {

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

  # Custom declaration of a related data node
  RELATED

  # Some more ideas: MIRROR (mirroring another data node),
  # CAUSE (has recognized effects of a related data node),
  # EFFECT (has recognized its effect to a related data node)
}

`];

/* Resolvers example from https://github.com/apollographql/GitHunt-API/

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
};*/