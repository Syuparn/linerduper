import { RunResult, headlessRunCode } from "@runno/runtime"

type WASIRunner = (sourceCode: string, text: string) => Promise<RunResult>

export const wasiRunners: { [key: string]: WASIRunner } = {
  // HACK: add \n otherwise EOF does not work properly
  python: (sourceCode, text) => headlessRunCode('python', sourceCode, text+'\n'),
  ruby: (sourceCode, text) => headlessRunCode('ruby', sourceCode, text+'\n'),
  quickjs: (sourceCode, text) => headlessRunCode('quickjs', sourceCode, text+'\n'),
}

export const runnerCommands = Object.keys(wasiRunners)
