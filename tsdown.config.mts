import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  target: ["node16"],
  outDir: "lib",
  skipNodeModulesBundle: true,
  // publint disabled: DTS generated separately via tsc, so publint
  // would fail checking for .d.ts files that don't exist yet.
  // publint: { strict: true, pack: "npm" },
  unused: true,
});
