# @meanie/mongoose-upsert-many

[![npm version](https://img.shields.io/npm/v/@meanie/mongoose-upsert-many.svg)](https://www.npmjs.com/package/@meanie/mongoose-upsert-many)
[![node dependencies](https://david-dm.org/meanie/mongoose-upsert-many.svg)](https://david-dm.org/meanie/mongoose-upsert-many)
[![github issues](https://img.shields.io/github/issues/meanie/mongoose-upsert-many.svg)](https://github.com/meanie/mongoose-upsert-many/issues)


A plugin that adds an upsertMany bulk op to Mongoose schemas

![Meanie](https://raw.githubusercontent.com/meanie/meanie/master/meanie-logo-full.png)

## Installation

You can install this package using `yarn` or `npm`.

```shell
#yarn
yarn add @meanie/mongoose-upsert-many

#npm
npm install @meanie/mongoose-upsert-many --save
```

## Usage

Setup as a global plugin for all Mongoose schema's:

```js
const mongoose = require('mongoose');
const upsertMany = require('@meanie/mongoose-upsert-many');

//Global plugin
mongoose.plugin(upsertMany);
```

Or for a specific (sub) schema:

```js
const mongoose = require('mongoose');
const upsertMany = require('@meanie/mongoose-upsert-many');
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

**toObjectConfig**: Configuration to pass to the `toObject` method when converting Mongoose models back to plain items, safe for insertion into the bulk operation. Default value is `{depopulate: true, versionKey: false}`.

**Ordered**: Specifies if the bulk operation should be ordered or unordered. Default value is `true`.

## Migrating from 1.x to 2.x
Plugin configuration is now passed as a single object via the `upsertMany` key in your schema options. If you used the `upsertMatchFields` setting, you need to replace this with:

```js
const MySchema = new Schema({/* ... */}, {
  upsertMany: {
    matchFields: ['field1', 'field2'],
  },
});
```

The plugin will now use [bulkWrite](https://docs.mongodb.com/manual/reference/method/db.collection.bulkWrite/) under the hood, and it will default to the `updateOne` operation, instead of `replaceOne`.

If you need to use `replaceOne`, specify it as the `type` in your configuration:

```js
const MySchema = new Schema({/* ... */}, {
  upsertMany: {
    type: 'replaceOne',
  },
});
```

Lastly, the plugin no longer converts items to Mongoose models by default. If you want to re-enable this to for example include default schema values in your upsert operations, enable this explicitly as follows:

```js
const MySchema = new Schema({/* ... */}, {
  upsertMany: {
    ensureModel: true,
  },
});
```

## Issues & feature requests

Please report any bugs, issues, suggestions and feature requests in the [@meanie/mongoose-upsert-many issue tracker](https://github.com/meanie/mongoose-upsert-many/issues).

## Contributing

Pull requests are welcome! If you would like to contribute to Meanie, please check out the [Meanie contributing guidelines](https://github.com/meanie/meanie/blob/master/CONTRIBUTING.md).

## Sponsor

This package has been kindly sponsored by [Hello Club](https://helloclub.com?source=meanie), an [all in one club and membership management solution](https://helloclub.com?source=meanie) complete with booking system, automated membership renewals, online payments and integrated access and light control. Check us out if you happen to belong to any kind of club or if you know someone who helps run a club!

## License

(MIT License)

Copyright 2018-2020, Adam Reis
