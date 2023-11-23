import { useState } from 'react'
import { headlessRunCode } from "@runno/runtime"
import './App.css'
import StdinArea from './components/StdinArea'
import { StdinContext } from './contexts/StdinContext'

function App() {
  const [output, setOutput] = useState("")
  const [stdin, setStdin] = useState("")

  headlessRunCode("python", "print('Hello World!')").then(value => {
    if (value.resultType === "complete") {
      setOutput(value.stdout)
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
      <div>
        <p>
          Result: {output}
        </p>
      </div>
      <StdinContext.Provider value={{stdin, setStdin}}>
        <StdinArea />
      </StdinContext.Provider>
    </>
  )
}

export default App
