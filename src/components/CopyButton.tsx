import { CopyIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

function CopyButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      colorScheme='gray'
      onClick={onClick}
    >
      Copy&nbsp;<CopyIcon />
    </Button>
  )
}

export default CopyButton
