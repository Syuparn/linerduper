import { useState } from 'react'
import { headlessRunCode } from "@runno/runtime"
import './App.css'
import StdinArea from './components/StdinArea'
import { StdinContext } from './contexts/StdinContext'
import { SourceContext } from './contexts/SourceContext'
import CodeArea from './components/CodeArea'

function App() {
  const [text, setText] = useState("")
  const [sourceCode, setSourceCode] = useState("")

  headlessRunCode("python", "print('Hello World!')").then(value => {
    if (value.resultType === "complete") {
      setText(value.stdout)
    }
  })

  return (
    <>
      <h1>LinerDuper</h1>
      <div className='subtitle'>
        <p>
          A tiny text editor for one-liner lovers!<br />
          This works offline by WASI.
        </p>
      </div>
      <SourceContext.Provider value={{source: sourceCode, setSource: setSourceCode}}>
        <CodeArea />
      </SourceContext.Provider>
      <StdinContext.Provider value={{stdin: text, setStdin: setText}}>
        <StdinArea />
      </StdinContext.Provider>
    </>
  )
}

export default App
