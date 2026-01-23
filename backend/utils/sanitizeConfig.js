export const sanitizeConfig = (input, schema) => {
  if (typeof input !== "object" || !input || typeof schema !== "object") {
    return {};
  }

  const output = {};

  for (const key in schema) {
    if (!(key in input)) continue;

    const rule = schema[key];
    const value = input[key];

    if (rule === true) {
      output[key] = value;
    } else if (typeof rule === "object" && typeof value === "object") {
      const nested = sanitizeConfig(value, rule);
      if (Object.keys(nested).length) output[key] = nested;
    }
  }

  return output;
};
