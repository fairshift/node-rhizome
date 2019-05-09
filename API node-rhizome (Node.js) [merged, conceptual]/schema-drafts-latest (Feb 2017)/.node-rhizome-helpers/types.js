import SimpleSchema from 'simpl-schema';

// There are some data types that are not present with Javascript or SimpleSchema
// Question: What is the reason behind it?

export const Integer = {type: SimpleSchema.Integer};
export const UniqueInteger = {type: SimpleSchema.Integer, unique: true};

export const UniqueString = {type: String, unique: true};

export const Text = {type: String, sqlType: 'Text'};

import BigNumber from 'bignumber.js'; // Library which Ethereum uses for big numbers with more than 48 characters 
export BigNumber;					  //(which Javascript doesn't handle)