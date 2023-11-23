import React from 'react'

type CommandState = {
  command: string,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
}

export const CommandContext = React.createContext<CommandState>({command: "", setCommand: () => {}})
