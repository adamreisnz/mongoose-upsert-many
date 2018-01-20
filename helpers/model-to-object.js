'use strict';

/**
 * Helper to ensure items are Mongoose models and then convert to objects
 */
module.exports = function modelToObject(item, Model) {

  //Ensure instance of the model
  if (!(item instanceof Model)) {
    item = new Model(item);
  }

  //Convert to object
  item = item.toObject({
    depopulate: true,
    versionKey: false,
  });

  //Remove _id as this can't be present in the item when doing bulk upsert
  delete item._id;

  //Return
  return item;
};
