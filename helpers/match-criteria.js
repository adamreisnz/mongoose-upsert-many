'use strict';

/**
 * Helper to extract match criteria
 */
module.exports = function matchCriteria(item, fields) {
  const match = {};
  for (const field of fields) {
    match[field] = item[field];
  }
  return match;
};
