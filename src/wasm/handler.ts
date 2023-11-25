import { CompleteResult, RunResult, headlessRunCode } from "@runno/runtime"
import { WASI } from "@runno/wasi"

type WASIRunner = (sourceCode: string, text: string) => Promise<RunResult>

// HACK: fix link path because endpoint of GitHub pages is not root ('/wasm/awk.wasm' is resolved to 'https://syuparn.github.io/wasm/awk.wasm')
const basePath = 'https://syuparn.github.io/linerduper/'

export const wasiRunners: { [key: string]: WASIRunner } = {
  // HACK: add \n otherwise EOF does not work properly
  python: (sourceCode, text) => headlessRunCode('python', sourceCode, text+'\n'),
  ruby: (sourceCode, text) => headlessRunCode('ruby', sourceCode, text+'\n'),
  javascript: (sourceCode, text) => headlessRunCode('quickjs', sourceCode, text+'\n'),
  awk: (sourceCode, text) => wrapWASIRunner(basePath+'/wasm/awk.wasm', text+'\n', [sourceCode]),
  jq: (sourceCode, text) => wrapWASIRunner(basePath+'/wasm/jq.wasm', text+'\n', [sourceCode]),
  gotemplate: (sourceCode, text) => wrapWASIRunner(basePath+'/wasm/gotemplate.wasm', text+'\n', [sourceCode]),
  pangaea: (sourceCode, text) => wrapWASIRunner(basePath+'/wasm/pangaea.wasm', text+'\n', ['-e', sourceCode]),
  // NOTE: php-cgi STDIN does not work
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
