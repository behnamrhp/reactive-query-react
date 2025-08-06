import { defineConfig, InlineConfig, UserConfig } from "vite";
import path from "path";
import tsConfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "src/test/setup.ts",
    root: "./",
    coverage: {
      provider: "v8",
      reporter: ["lcov", "clover"],
      reportsDirectory: "coverage",
    },
  },
  plugins: [
    tsConfigPaths(),
    dts({
      insertTypesEntry: true,
      include: ["src/"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactiveQueryReact",
      fileName: (format) =>
        `reactive-query-react.${format === "es" ? "esm" : format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "rxjs", "reactive-query"],
      output: {
        globals: {
          react: "React",
          rxjs: "rxjs",
          "reactive-query": "ReactiveQuery",
        },
        exports: "named",
      },
    },
    sourcemap: true,
    minify: false,
    target: "es2020",
  },
} as VitestConfigExport); 