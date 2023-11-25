import { Link, Text } from "@chakra-ui/react"


function Logo() {
  return (
    <Text
      marginTop='1rem'
      fontSize='lg'
    >
      <Link
        href='https://github.com/Syuparn/linerduper'
        marginLeft='0.5rem'
      >
        [ See source codes (GitHub) ]
      </Link>
    </Text>

  )
}

export default Logo
