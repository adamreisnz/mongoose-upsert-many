'use strict';

/**
 * Dependencies
 */
const lookupPath = require('./lookup-path');

/**
 * Helper to extract match criteria
 */
module.exports = function matchCriteria(item, fields) {
  const match = {};
  for (const field of fields) {
    match[field] = lookupPath(item, field);
  }
  return match;
};
