import crypto from "node:crypto";

function getUniqueId() {
  const id = crypto.randomUUID();
  return id;
}

export { getUniqueId };
