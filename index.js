'use strict';

/**
 * Load helpers
 */
const modelToObject = require('./helpers/model-to-object');
const matchCriteria = require('./helpers/match-criteria');

/**
 * Apply bulk upsert helper to schema
 */
module.exports = function upsertMany(schema) {
  schema.statics.upsertMany = function(items, matchFields) {

    //Use default match fields if none provided
    matchFields = matchFields || schema.options.upsertMatchFields;
    if (!Array.isArray(matchFields) || matchFields.length === 0) {
      matchFields = ['_id'];
    }

    //Create bulk operation
    const bulk = this.collection.initializeUnorderedBulkOp();
    items
      .map(item => modelToObject(item, this))
      .forEach(item => {

        //Extract match criteria
        const match = matchCriteria(item, matchFields);

        //Can't have _id field when upserting item
        delete item._id;

        //Create upsert
        bulk
          .find(match)
          .upsert()
          .replaceOne(item);
      });

    //Execute bulk operation wrapped in promise
    return new Promise((resolve, reject) => {
      bulk.execute((error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  };
};
