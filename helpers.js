
/**
 * Lookup dotted path in an object
 */
export function lookupPath(obj, path) {
  const keys = path.split('.')
  for (let i = 0; i < keys.length && obj !== undefined; i++) {
    const key = keys[i]
    obj = obj !== null ? obj[key] : undefined
  }
  return obj
}

/**
 * Helper to extract match criteria
 */
export function matchCriteria(item, fields) {
  const match = {}
  for (const field of fields) {
    match[field] = lookupPath(item, field)
  }
  return match
}

/**
 * Parse item
 */
export function parseItem(item, Model, config) {

  //Get config
  const {ensureModel, toObjectConfig} = config

  //Ensure item is a model, to allow inclusion of default values
  if (ensureModel && !(item instanceof Model)) {
    item = new Model(item)
  }

  //Convert to plain object now if model given
  if (item instanceof Model) {
    item = item.toObject(toObjectConfig)
  }

  //Return
  return item
}

