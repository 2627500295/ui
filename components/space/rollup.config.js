import summary from "rollup-plugin-summary";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";

/** @type {import('rollup').RollupOptions} */
const options = {
  input: "src/ui-space.ts",
  output: [
    {
      // dir: "dist",
      // name: "my-element.esm.js",
      file: "dist/ui-space.esm.js",
      format: "esm",
    },
  ],
  onwarn(warning) {
    if (warning.code !== "THIS_IS_UNDEFINED") {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    typescript(),
    replace({
      "Reflect.decorate": "undefined",
      preventAssignment: true,
    }),
    resolve(),
    terser({
      ecma: 2017,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
  ],
};

export default options;
