import { HStack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { headlessRunCode } from "@runno/runtime"
import StdinArea from './components/StdinArea'
import { StdinContext } from './contexts/StdinContext'
import { SourceContext } from './contexts/SourceContext'
import CodeArea from './components/CodeArea'
import ApplyButton from './components/ApplyButton'

function App() {
  const [text, setText] = useState("")
  const [sourceCode, setSourceCode] = useState("")

  const applyCode = () => {
    headlessRunCode("ruby", sourceCode, text).then(value => {
      if (value.resultType !== "complete") {
        console.log(`failed to apply source code: ${JSON.stringify(value)}`)
        return
      }

      if (value.stderr !== "") {
        alert(value.stderr)
        return
      }

      setText(value.stdout)
    })
  }

  return (
    <>
      <SourceContext.Provider value={{source: sourceCode, setSource: setSourceCode}}>
        <StdinContext.Provider value={{stdin: text, setStdin: setText}}>
          <VStack
            justify='center'
            padding='0.5rem'
          >
            <Text
              fontSize='6xl'
              text-align='center'
            >
              LinerDuper
            </Text>
            <Text
              fontSize='lg'
              text-align='center'
            >
              A tiny text editor for one-liner lovers!<br />
              This works offline by WASI.
            </Text>
          </VStack>

          <HStack
            justify='center'
            padding='1rem'
          >
            <CodeArea />
            <ApplyButton
              onClick={applyCode}
            />
          </HStack>

          <StdinArea />
        </StdinContext.Provider>
      </SourceContext.Provider>
    </>
  )
}

export default App
