# node-rhizome

Augmenting existing data collections (for Node.js), providing:

- multilingual content and branches
- storing state of data and its relations, enabling validation
- GraphQL endpoint

Currently in question - which storage medium to choose?

- SQL requires storing additional cache record somewhere else, as structure
of 'node-rhizome' database tables is quite complex

- NoSQL can store 'node-rhizome' schema as appendix to a document, or as a standalone document ... But which to choose? MongoDB (popular, compatible with Meteor), Couchbase / PouchDB (replication among various devices, multidimensional indexing)

External storage of hashed state of data and its relations
- Ethereum



Some inspirations for this package can currently be found in 'helpers/index.js' file