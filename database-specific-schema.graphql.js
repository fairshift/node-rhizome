/* When using GraphQL, fragments, defined in scope of application, should be delivered as inputs to 
   schema($collectionFragments) function of 'graphql.schema.js'

   They should be something like the following (!!! revisit):
 */

export const schema = [`

  ... on User {
    // Stuff here is type checked as User
  }
  ... on InvalidType { // statically known to be bad
    // ...
  }
  ... on OtherType {
    // checked as OtherType
  }

`];
