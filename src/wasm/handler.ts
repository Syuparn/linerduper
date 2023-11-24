import { CompleteResult, RunResult, headlessRunCode } from "@runno/runtime"
import { WASI } from "@runno/wasi"

type WASIRunner = (sourceCode: string, text: string) => Promise<RunResult>

export const wasiRunners: { [key: string]: WASIRunner } = {
  // HACK: add \n otherwise EOF does not work properly
  python: (sourceCode, text) => headlessRunCode('python', sourceCode, text+'\n'),
  ruby: (sourceCode, text) => headlessRunCode('ruby', sourceCode, text+'\n'),
  quickjs: (sourceCode, text) => headlessRunCode('quickjs', sourceCode, text+'\n'),
  pangaea: (sourceCode, text) => wrapWASIRunner('/wasm/pangaea.wasm', text+'\n', ['-e', sourceCode]),
}

export const runnerCommands = Object.keys(wasiRunners)

async function wrapWASIRunner(path: string, stdin: string , args: string[]) {
  const prepare: CompleteResult = {
    resultType: "complete",
    stdin: stdin,
    stdout: "",
    stderr: "",
    tty: "",
    exitCode: 0,
    fs: {}, // set later
  }

  // NOTE: WASIWorkerHost cannot be used for external binaries
  const result = await WASI.start(fetch(path), {
    // HACK: separate by -- otherwise args are passed to wasi runner directly
    args: ['--', ...args],
    stdout: out => {
      prepare.stdout += out
      prepare.tty += out
    },
    stderr: err => {
      prepare.stderr += err
      prepare.tty += err
    },
    // NOTE: null is required to tell worker to stop reading
    stdin: (() => {
      // HACK: use closure to send stdin only once
      let done = false
      return () => {
        if (done) {
          return null
        }
        done = true
        return stdin
      }
    })(),
  })

  prepare.fs = result.fs
  prepare.exitCode = result.exitCode

  return prepare
}
