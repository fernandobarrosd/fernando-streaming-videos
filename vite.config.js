import { defineConfig } from "vite";
import "dotenv/config";

export default defineConfig({
    server: {
        port: 3000
    },
    preview: {
        port: 5000
    },
    build: {
        outDir: "dist"
    },
    define: {
        "process.env": process.env
    }
});