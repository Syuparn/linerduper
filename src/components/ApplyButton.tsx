import { Button } from '@chakra-ui/react'

function ApplyButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      colorScheme='gray'
      onClick={onClick}
    >
      Apply
    </Button>
  )
}

export default ApplyButton
