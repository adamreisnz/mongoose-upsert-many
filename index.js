'use strict';

/**
 * Load helpers
 */
const parseItem = require('./helpers/parse-item');
const matchCriteria = require('./helpers/match-criteria');

/**
 * Apply bulk upsert helper to schema
 */
module.exports = function upsertMany(schema) {

  //Extract schema wide config
  const defaults = Object.assign({
    matchFields: ['_id'],
    type: 'updateOne',
    ensureModel: false,
    toObjectConfig: {
      depopulate: true,
      versionKey: false,
    },
    ordered: true,
  }, schema.options.upsertMany || {});

  //Create helper
  schema.statics.upsertMany = function(items, config) {

    //Merge config
    config = Object.assign({}, defaults, config || {});

    //Get config
    const {type} = config;
    const upsert = true;

    //Use default match fields if none provided
    let {matchFields} = config;
    if (!Array.isArray(matchFields) || matchFields.length === 0) {
      matchFields = ['_id'];
    }

    //Create bulk operations
    const ops = items
      .map(item => {

        //Parse item
        item = parseItem(item, this, config);

        //Extract match criteria
        const filter = matchCriteria(item, matchFields);

        //Can't have _id field when upserting item
        if (typeof item._id !== 'undefined') {
          delete item._id;
        }

        //Check type
        switch (type) {

          //Insert op
          case 'insertOne':
            return {[type]: {document: item}};

          //Update op
          case 'updateOne':
          case 'updateMany':
            return {[type]: {filter, upsert, update: item}};

          //Delete op
          case 'deleteOne':
          case 'deleteMany':
            return {[type]: {filter}};

          //Replace op
          case 'replaceOne':
            return {[type]: {filter, upsert, replacement: item}};

          //Unknown
          default:
            throw new Error(`Unsupported bulkOp type: ${type}`);
        }
      });

    //Retrieve if bulkWrite should be a ordered or unordered write
    let {ordered} = config;

    //Bulk write
    return this.bulkWrite(ops, {ordered});
  };
};
