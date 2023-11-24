import { HStack, Text } from '@chakra-ui/react'
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
  const [isLoading, setIsLoading] = useState(false)

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
      // finish applying
      setIsLoading(false)
    })

    // start applying
    setIsLoading(true)
  }

  return (
    <>
      <SourceContext.Provider value={{source: sourceCode, setSource: setSourceCode}}>
        <StdinContext.Provider value={{stdin: text, setStdin: setText}}>
          <CommandContext.Provider value={{command: command, setCommand: setCommand}}>
            <Text
              fontSize='3xl'
              paddingBottom='4rem'
            >
              LinerDuper
            </Text>

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
                isLoading={isLoading}
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
