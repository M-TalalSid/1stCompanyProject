const fs = require("fs");

const data = require("./jeans_products.json"); // your file
const ndjson = data.map(doc => JSON.stringify(doc)).join("\n");

fs.writeFileSync("jeans_products.ndjson", ndjson);
console.log("✅ Converted to NDJSON: products.ndjson");
