import * as material from "@wq/material";

test("it loads", () => {
    for (const key in material) {
        expect(material).toHaveProperty(key, expect.anything());
    }
});
