function omit(names, obj) {
  const result = {};
  const index = {};
  let idx = 0;
  const len = names.length;

  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }
  return result;
}

export default omit;
