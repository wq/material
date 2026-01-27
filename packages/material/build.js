import * as wqReact from "@wq/react";
import * as wqMaterial from "@wq/material-web";
import fs from "fs";

const index = [];
index.push("export {");
for (const key in wqReact) {
    index.push(`    ${key},`);
}
index.push('} from "@wq/react";');
index.push("");

index.push("export {");
for (const key in wqMaterial) {
    index.push(`    ${key},`);
}
index.push('} from "@wq/material-web";');

const src = index.join("\n") + "\n";

console.log("src/index.js");
fs.writeFileSync("src/index.js", src);

console.log("src/index.native.js");
fs.writeFileSync(
    "src/index.native.js",
    src.replace(/@wq\/material-web/g, "@wq/material-native"),
);
