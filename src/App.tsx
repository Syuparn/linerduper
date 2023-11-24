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
import CopyButton from './components/CopyButton'
import UndoButton from './components/UndoButton'

function App() {
  const [text, setText] = useState('')
  const [previousText, setPreviousText] = useState('')
  const [sourceCode, setSourceCode] = useState('')
  const [command, setCommand] = useState(runnerCommands[0])
  const [isLoading, setIsLoading] = useState(false)

  const applyCode = () => {
    wasiRunners[command](sourceCode, text).then(value => {
      // finish applying
      setIsLoading(false)

      if (value.resultType !== 'complete') {
        console.log(`failed to apply source code: ${JSON.stringify(value)}`)
        return
      }

      if (value.stderr !== '') {
        alert(value.stderr)
        return
      }

      // HACK: remove last \n added automatically
      setPreviousText(text)
      setText(value.stdout.trimEnd())
    })

    // start applying
    setIsLoading(true)
  }

  const copyText = () => {
    navigator.clipboard.writeText(text)
  }

  const undo = () => {
    setText(previousText)
    setPreviousText('')
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
            <HStack
              justify='space-between'
              padding='1rem'
            >
              <UndoButton
                onClick={undo}
                isDisabled={previousText === ''}
              />
              <CopyButton
                onClick={copyText}
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
