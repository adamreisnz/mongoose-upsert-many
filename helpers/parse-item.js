'use strict';

/**
 * Parse item
 */
module.exports = function parseItem(item, Model, config) {

  //Get config
  const {ensureModel, toObjectConfig} = config;

  //Ensure item is a model, to allow inclusion of default values
  if (ensureModel && !(item instanceof Model)) {
    item = new Model(item);
  }

  //Convert to plain object now if model given
  if (item instanceof Model) {
    item = item.toObject(toObjectConfig);
  }

  //Return
  return item;
};
