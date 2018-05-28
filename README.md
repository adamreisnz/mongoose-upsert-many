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

mongoose.plugin(upsertMany);
```

Or for a specific (sub) schema:

```js
const mongoose = require('mongoose');
const upsertMany = require('@meanie/mongoose-upsert-many');
const {Schema} = mongoose;

const MySchema = new Schema({});
MySchema.plugin(upsertMany);
```

This plugin will expose a static `upsertMany` method on your models which you
can use to perform bulk upsert operations:

```js

//Large amount of items
const items = [
  ...
];

//Fields to match on for upsert condition
const matchFields = ['foo', 'bar.nested'];

//Perform bulk operation
const result = await MyModel.upsertMany(items, matchFields);

//Returns promise with MongoDB bulk result object
console.log(result.nUpserted + result.nModified, 'items processed');
```

Items you pass in can be mongoose Models or raw data, but they are always converted
to Mongoose models to ensure schema validation is applied, and then converted back
to plain, depopulated objects for safe insertion with the bulk operation.

Match fields are fields that are used as match criteria for the upsert operations,
 e.g. in the `find()` portion of the bulk op. You can also provide default match
 fields for the whole schema using the option `upsertMatchFields` when defining your schema.

## Issues & feature requests

Please report any bugs, issues, suggestions and feature requests in the [@meanie/mongoose-upsert-many issue tracker](https://github.com/meanie/mongoose-upsert-many/issues).

## Contributing

Pull requests are welcome! If you would like to contribute to Meanie, please check out the [Meanie contributing guidelines](https://github.com/meanie/meanie/blob/master/CONTRIBUTING.md).

## Credits

* Meanie logo designed by [Quan-Lin Sim](mailto:quan.lin.sim+meanie@gmail.com)

## License
(MIT License)

Copyright 2018, [Adam Reis](https://adam.reis.nz)
