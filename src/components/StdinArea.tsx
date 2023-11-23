import { Textarea } from '@chakra-ui/react'
import { useContext } from 'react'
import { StdinContext } from '../contexts/StdinContext'

function StdinArea() {
  const {stdin, setStdin} = useContext(StdinContext)
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(stdin)
    setStdin(e.target.value)
  }

  return (
    <Textarea className='stdinarea'
      placeholder='Input here and edit with one-liner scripts!'
      fontSize='xl'
      rows={20}
      height='auto'
      value={stdin}
      onChange={onChange}
    />
  )
}

export default StdinArea
