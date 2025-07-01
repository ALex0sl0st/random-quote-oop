function getUniqueId() {
  const id = crypto.randomUUID();
  return id;
}

function deepCopy(item) {
  return JSON.parse(JSON.stringify(item));
}

export { getUniqueId, deepCopy };
