import { HStack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import ApplyButton from './components/ApplyButton'
import CodeArea from './components/CodeArea'
import StdinArea from './components/StdinArea'
import { StdinContext } from './contexts/StdinContext'
import { SourceContext } from './contexts/SourceContext'
import CommandMenu from './components/CommandMenu'
import { CommandContext } from './contexts/CommandContext'
import { runnerCommands, wasiRunners } from './wasm/handler'

function App() {
  const [text, setText] = useState('')
  const [sourceCode, setSourceCode] = useState('')
  const [command, setCommand] = useState(runnerCommands[0])

  const applyCode = () => {
    wasiRunners[command](sourceCode, text).then(value => {
      if (value.resultType !== 'complete') {
        console.log(`failed to apply source code: ${JSON.stringify(value)}`)
        return
      }

      if (value.stderr !== '') {
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
          <CommandContext.Provider value={{command: command, setCommand: setCommand}}>
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
              <CommandMenu
                commands={runnerCommands}
              />
              <CodeArea />
              <ApplyButton
                onClick={applyCode}
              />
            </HStack>

            <StdinArea />
          </CommandContext.Provider>
        </StdinContext.Provider>
      </SourceContext.Provider>
    </>
  )
}

export default App
