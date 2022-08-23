/**
 * Copyright (C) 2022  DarrenDanielDay <Darren_Daniel_Day@hotmail.com>
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import esbuild from "esbuild";
import path from "path";
import ts from "typescript";
//#region handle input
const isDebug = process.env["NODE_ENV"] === "debug";
if (!isDebug) {
  console.log(`\
Copyright (C) 2022  DarrenDanielDay <Darren_Daniel_Day@hotmail.com>

This source code is licensed under the GPL-3.0 license found in the
LICENSE file in the root directory of this source tree.
`);
}
const [, , rawFile] = process.argv;
if (!rawFile) {
  throw new Error("No input file found.");
}
const parsed = path.parse(rawFile);
const globalLibsFile = "global-libs.ts";
const globalBuiltInsFile = "global-builtins.ts";
const globalTestUtilsFile = "global-test-utils.ts";
const internalFiles = [globalLibsFile, globalBuiltInsFile, globalTestUtilsFile];
const thisScriptFile = "run.mjs";
const file = parsed.base;
if ([...internalFiles, thisScriptFile].includes(file) || !/\.m?[jt]s$/.test(file)) {
  throw new Error("Invalid input file.");
}
//#endregion

//#region transform typescript code for Node.JS
/** @type {ts.ParseConfigFileHost} */
// @ts-expect-error
const host = ts.sys;
const configFile = ts.findConfigFile(process.cwd(), ts.sys.fileExists);
if (configFile == null) {
  throw new Error("Cannot find tsconfig.json.");
}
const tsconfig = ts.getParsedCommandLineOfConfigFile(configFile, {}, host);
if (!tsconfig) {
  throw new Error("Invalid tsconfig file.");
}
const { options: compilerOptions } = tsconfig;
const rawOutDir = compilerOptions.outDir;
if (rawOutDir == null) {
  throw new Error("No `outDir` configured in tsconfig.json.");
}
const outdir = path.parse(rawOutDir).name;
const rawTarget = compilerOptions.target;
if (rawTarget == null) {
  throw new Error("No `target` configured in tsconfig.json.");
}
const target = ts.ScriptTarget[rawTarget];
const outExt = ".mjs";
const outfile = path.join(outdir, `${parsed.name}${outExt}`);
await esbuild.build({
  entryPoints: [rawFile, ...internalFiles],
  outdir,
  platform: "neutral",
  outExtension: {
    ".js": outExt,
  },
  target,
  sourcemap: isDebug,
});
//#endregion

//#region run main code
/**
 * convert path to module URL
 * @param {string} jsFilePath path
 * @returns module URL
 */
const toModuleURL = (jsFilePath) => `.${path.sep}${jsFilePath}`.replace(/\\|\//g, "/");
//#region inject globals
for (const injectionFile of internalFiles) {
  const importPath = toModuleURL(`${path.join(outdir, path.parse(injectionFile).name)}${outExt}`);
  await import(importPath);
}
//#endregion

const mainTag = `${file} total time cost`;
console.time(mainTag);
try {
  const importPath = toModuleURL(outfile);
  await import(importPath);
} catch (error) {
  console.error(error);
}
console.timeEnd(mainTag);
//#endregion
