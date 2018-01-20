'use strict';

/**
 * Lookup dotted path in an object
 */
module.exports = function lookupPath(obj, path) {
  const keys = path.split('.');
  for (let i = 0; i < keys.length && obj !== undefined; i++) {
    const key = keys[i];
    obj = obj !== null ? obj[key] : undefined;
  }
  return obj;
};
