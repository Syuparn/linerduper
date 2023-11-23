import { Textarea } from '@chakra-ui/react'
import { useContext } from 'react'
import { SourceContext } from '../contexts/SourceContext'

function CodeArea() {
  const {source, setSource} = useContext(SourceContext)
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(source)
    setSource(e.target.value)
  }

  return (
    <Textarea className='codearea'
      placeholder='Input one-liner code here'
      fontSize='xl'
      rows={1}
      height='auto'
      value={source}
      onChange={onChange}
    />
  )
}

export default CodeArea
