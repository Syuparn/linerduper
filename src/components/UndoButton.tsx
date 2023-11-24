import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

function UndoButton({ onClick, isDisabled }: { onClick: () => void, isDisabled: boolean }) {
  return (
    <Button
      colorScheme='gray'
      onClick={onClick}
      isDisabled={isDisabled}
    >
      <ArrowBackIcon />&nbsp;Undo
    </Button>
  )
}

export default UndoButton
