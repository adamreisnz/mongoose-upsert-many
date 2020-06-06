'use strict';

/**
 * Helper to ensure items are Mongoose models and then convert to objects
 */
module.exports = function modelToObject(item, Model, noDefaults = false) {

  //TODO: Wait for https://github.com/Automattic/mongoose/issues/8271 to be implemented
  if (noDefaults) {
    return item;
  }

  //Ensure instance of the model
  if (!(item instanceof Model)) {
    item = new Model(item);
  }

  //Convert to object
  item = item.toObject({
    depopulate: true,
    versionKey: false,
  });

  //Return
  return item;
};
