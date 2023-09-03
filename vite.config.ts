import { defineConfig } from "vite";
import glob from "tiny-glob";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: await glob("src/**/*.ts"),
      formats: ["es"],
    },
  },
  base: "",
});
