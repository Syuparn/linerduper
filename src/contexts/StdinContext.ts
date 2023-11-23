import React from 'react'

type StdinState = {
  stdin: string,
  setStdin: React.Dispatch<React.SetStateAction<string>>,
}

export const StdinContext = React.createContext<StdinState>({stdin: "", setStdin: () => {}})
