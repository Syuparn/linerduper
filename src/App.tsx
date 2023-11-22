import { useState } from 'react'
import { headlessRunCode } from "@runno/runtime"
import './App.css'

function App() {
  const [output, setOutput] = useState("")

  headlessRunCode("python", "print('Hello World!')").then(value => {
    if (value.resultType === "complete") {
      setOutput(value.stdout);
    }
  });

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Result: {output}
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
