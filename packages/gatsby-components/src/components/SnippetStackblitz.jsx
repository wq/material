import { useRef, useEffect } from "react";
import sdk from "@stackblitz/sdk";
import { View } from "@wq/material-web";

export default function SnippetStackblitz({
    code,
    dependencies,
    name,
    description,
    height = 400,
}) {
    const ref = useRef(null);
    useEffect(() => {
        const wrapper = ref.current;

        if (!wrapper) {
            return;
        }

        const target = document.createElement("div");
        wrapper.appendChild(target);
        target.style.flex = "1";

        sdk.embedProject(
            target,
            {
                files: {
                    ...files,
                    "src/App.jsx": code,
                    "package.json": createPackageJson(name, dependencies),
                },
                title: name,
                description: description,
                template: "node",
            },
            {
                openFile: "src/App.jsx",
                crossOriginIsolated: true,
                clickToLoad: true,
                height,
            },
        );
        return () => {
            if (wrapper) {
                wrapper.innerHTML = "";
            }
        };
    }, [code, dependencies, name, description, height]);

    return (
        <View
            ref={ref}
            sx={{
                display: "flex",
                height,
                "& iframe": { border: "1px solid #ddd", borderRadius: 2 },
            }}
        />
    );
}

const files = {
    "vite.config.js": `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
});`,
    "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>wq Example App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
    "src/main.jsx": `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>,
);`,
};

function createPackageJson(name, dependencies) {
    return JSON.stringify(
        {
            name: name || "wq-example-app",
            private: true,
            version: "0.0.0",
            type: "module",
            scripts: {
                dev: "vite",
                build: "vite build",
                preview: "vite preview",
            },
            dependencies: {
                ...dependencies,
                react: "^19.3.0",
                "react-dom": "^19.3.0",
            },
            devDependencies: {
                "@vitejs/plugin-react": "^6.1.1",
                vite: "^8.3.1",
            },
        },
        null,
        2,
    );
}
