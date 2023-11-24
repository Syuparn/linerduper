import { Button } from '@chakra-ui/react'

function ApplyButton({ onClick, isLoading }: { onClick: () => void, isLoading: boolean }) {
  return (
    <Button
      colorScheme='gray'
      onClick={onClick}
      isLoading={isLoading}
    >
      Apply
    </Button>
  )
}

export default ApplyButton
