import * as material from "@wq/material/src/index.native.js";

test("it loads", () => {
    for (const key in material) {
        expect(material).toHaveProperty(key, expect.anything());
    }
});
