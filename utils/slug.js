const slug = require("slug");
slug.defaults.modes["rfc3986"] = {
  replacement: "-", // replace spaces with replacement
  remove: null, // (optional) regex to remove characters
  lower: true, // result in lower case
  trim: true, // trim leading and trailing replacement chars
  fallback: true, // use base64 to generate slug for empty results
};
const createSlug = (text) => {
  return slug(text);
};

module.exports = { createSlug };
