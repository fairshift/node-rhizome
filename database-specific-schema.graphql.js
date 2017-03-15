export const schema = [`

type State {
  ... on User {
    // Stuff here is type checked as User
  }
  ... on InvalidType { // statically known to be bad
    // ...
  }
  ... on OtherType {
    // checked as OtherType
  }
}

type Draft {
  ... on User {
    // Stuff here is type checked as User
  }
  ... on InvalidType { // statically known to be bad
    // ...
  }
  ... on OtherType {
    // checked as OtherType
  }
}

`];