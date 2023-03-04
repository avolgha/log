//import resolve from "@rollup/plugin-node-resolve";
//import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json", };

export default [
//	{
//		input: "src/main.ts",
//		output: {
//			name: "package",
//			file: pkg.browser,
//			format: "umd",
//			sourcemap: true,
//		},
//		plugins: [
//			resolve(),
//			commonjs(),
//			typescript(),
//			terser(),
//		],
//	},
	{
		input: "src/main.ts",
		plugins: [
			typescript(),
			terser(),
		],
		external: [ "kleur", ],
		output: [
			{ file: pkg.main, format: "cjs", sourcemap: true, },
			{ file: pkg.module, format: "es", sourcemap: true, },
		],
	},
];
