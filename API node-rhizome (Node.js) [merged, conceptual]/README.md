# node-rhizome

Keep track of related publications in a standardized way - trails of different types of data node relations: of edits, versions, leaps in evolution, flow of inspirations ...

Ships with a set of patterns concerning relations amongst data points or data nodes (with support for schema migrations), API endpoint (exposed functions, JS and GraphQL), schemas (JSON and SimpleSchema) and a list of supporting modules.

Package releases should always ensure data validity by expecting (specific) inputs when so defined: from users (by returning a list of pending processes), and by programmatic checks of data immutability (by comparing checksums) and of matching types of data and content.

Validation and ease of use are of main concern - Ethereum blockchain, Tweeter (for singing admins only) or an external (Peer2P) medium can be used to store checksums of data ( = its computed unique identifying hash value), exported or mirrored immutably. Data type validation is a function of the standard JSON schema (and one of the most maintained suitable Node.js packages) and Regular Expressions (extending the forementioned json-schema types).

Inserting and updating data derived in way of this standardized data schema can be done by the main node-rhizome package running on Node.js (and it doesn't significantly hamper efficiency, as writing is a less frequent database operation).

Support for various Sql and noSql databases and key-value stores is possible, by extending with various npmjs.com packages.

## Extensionable

Transpiling of datasets, when needed, is possible by using jsOnIon(.org) package. It enables transforming outputs from a given data source to inputs into another, by a defined remapping schema (a simple and readable JSON object, commented where possible). It can also create a source map, pointing to originating services and data schema versions (relying on source code repositories and URL routes, as these evolve through time).

(XML) **dictionaries** and **parsing rules** should be assembled and supplied as expression Trie(s) *when automaticly declaring types of relations* among data nodes on basis of content ( = "unstructured data"), to suggest to a user a list of types of relations for specific data nodes (eg. asking for confirmations when users revisit their publications).

To use efficiently with a local database a list of interfaces for various server environments is supplied ('read' functionality only):
 - node-rhizome for PHP (github.com/fairshift/node-rhizome)

## ...
In development