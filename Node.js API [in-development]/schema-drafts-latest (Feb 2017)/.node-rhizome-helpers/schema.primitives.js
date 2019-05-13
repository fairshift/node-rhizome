export const fieldValue = { // Field and value schema (SQL)
  field: String,
  value: Text
};

export const fieldDifference = { // Field difference in relation to previous state
  field: String,
  difference: String,
  levensthein: Integer // Steps of change, where applicable
};

export const fieldName {  // Field name schema
  field: String
}