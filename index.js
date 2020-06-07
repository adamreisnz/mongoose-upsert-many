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
  }, schema.options.upsertMany || {});

  //Create helper
  schema.statics.upsertMany = function(items, config) {

    //Merge config
    config = Object.assign({}, defaults, config || {});

    //Get config
    const {type} = config;

    //Use default match fields if none provided
    let {matchFields} = config;
    if (!Array.isArray(matchFields) || matchFields.length === 0) {
      matchFields = ['_id'];
    }

    //Create bulk operations
    const ops = items
      .map(item => {

        //Parse item
        const update = parseItem(item, this, config);

        //Extract match criteria
        const filter = matchCriteria(item, matchFields);

        //Can't have _id field when upserting item
        if (typeof item._id !== 'undefined') {
          delete item._id;
        }

        //Create bulk op
        return {
          [type]: {
            filter,
            update,
            upsert: true,
          },
        };

      });

    //Bulk write
    return this.bulkWrite(ops);
  };
};
