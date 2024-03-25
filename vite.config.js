import { defineConfig, loadEnv } from "vite";
import "dotenv/config";


export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
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
            "process.env.API_KEY": JSON.stringify(env.API_KEY),
            "process.env.AUTH_DOMAIN": JSON.stringify(env.AUTH_DOMAIN),
            "process.env.PROJECT_ID": JSON.stringify(env.PROJECT_ID),
            "process.env.STORAGE_BUCKET": JSON.stringify(env.STORAGE_BUCKET),
            "process.env.MESSAGING_SENDER_ID": JSON.stringify(env.MESSAGING_SENDER_ID),
            "process.env.APP_ID": JSON.stringify(env.APP_ID)
        }
    }
})