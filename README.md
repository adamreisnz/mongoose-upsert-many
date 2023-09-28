# @reis/mongoose-upsert-many

[![npm version](https://img.shields.io/npm/v/@reis/mongoose-upsert-many.svg)](https://www.npmjs.com/package/@reis/mongoose-upsert-many)
[![github issues](https://img.shields.io/github/issues/adamreisnz/mongoose-upsert-many.svg)](https://github.com/adamreisnz/mongoose-upsert-many/issues)


A plugin that adds an upsertMany bulk op to Mongoose schemas

## Installation

You can install this package using `yarn` or `npm`.

```shell
#yarn
yarn add @reis/mongoose-upsert-many

#npm
npm install @reis/mongoose-upsert-many --save
```

## Usage

Setup as a global plugin for all Mongoose schema's:

```js
import mongoose from 'mongoose'
import {upsertMany} from '@reis/mongoose-upsert-many'

//Global plugin
mongoose.plugin(upsertMany);
```

Or for a specific (sub) schema:

```js
import mongoose from 'mongoose'
import {upsertMany} from '@reis/mongoose-upsert-many'
const {Schema} = mongoose;

//Define schema
const MySchema = new Schema(/* ... */}, {

  //Schema-wide configuration for the upsertMany plugin
  upsertMany: {
    matchFields: ['field1', 'field2'],
    type: 'replaceOne',
    ensureModel: true,
  },
});

//Apply plugin
MySchema.plugin(upsertMany);
```

This plugin will expose a static `upsertMany` method on your models which you
can use to perform bulk upsert operations:

```js

//Large amount of items
const items = [
  ...
];

//Optionally, overwrite schema-wide configuration
const config = {matchFields: ['foo', 'bar.nested']};

//Perform bulk operation
const result = await MyModel.upsertMany(items, config);

//Returns promise with MongoDB bulk result object
console.log(result.nUpserted + result.nModified, 'items processed');
```

## Configuration

The following configuration options are available and can be passed either via the schema options or as the last parameter in the `upsertMany` method:

**type**: The bulk op type, supports any of the available [bulkWrite](https://docs.mongodb.com/manual/reference/method/db.collection.bulkWrite) ops, although the insert or delete ops will obviously not perform an upsert. Default value is `updateOne`.

**matchFields**: Match fields are fields that are used to create the filter criteria for the upsert operations. For example, passing `['name']` will try to match each item on the value of its `name` property. Default value is `['_id']`.

**ensureModel**: Items you pass in to the plugin can be either mongoose Models or raw data. When this flag is set to `true`, items are always converted
to Mongoose models to ensure schema validation and any schema defaults are applied. Default value is `false`.

**ordered**: Whether the bulk operations are to be ordered or not. Passed to Mongoose. Default value is `true`.

**toObjectConfig**: Configuration to pass to the `toObject` method when converting Mongoose models back to plain items, safe for insertion into the bulk operation. Default value is `{depopulate: true, versionKey: false}`.

## Issues & feature requests

Please report any bugs, issues, suggestions and feature requests in the [mongoose-upsert-many issue tracker](https://github.com/adamreisnz/mongoose-upsert-many/issues).

## License

(MIT License)

Copyright 2018-2023, Adam Reis
