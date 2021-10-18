import dts from "rollup-plugin-dts";
import esBuild from "rollup-plugin-esbuild";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const name = require("./package.json").main.replace(/\.js$/, "");

function bundle(config) {
  return { ...config, input: "src/index.ts", external: (id) => !/^[./]/.test(id) };
}

export default [
  bundle({
    plugins: [
      peerDepsExternal(),
      esBuild({ target: "es2019", minify: false }),
      resolve(),
      babel({ babelHelpers: "bundled" }),
    ],
    output: [
      { file: `${name}.js`, format: "cjs", sourcemap: true },
      { file: `${name}.mjs`, format: "es", sourcemap: true },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: { file: `${name}.d.ts`, format: "es" },
  }),
];
