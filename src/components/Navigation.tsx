import { Flex, Box, Image, Spacer, Button } from '@chakra-ui/react'

const Navigation = () => {
  return (
    <Flex py="3" alignItems="center">
      <Box pr="4">
        <Image src="/logo.png" alt="Pokemon logo" w={140} />
      </Box>
      <Spacer />
      <Box pl="4">
        <Button colorScheme="teal" mr="4">
          Sign Up
        </Button>
        <Button colorScheme="teal">Log in</Button>
      </Box>
    </Flex>
  )
}

export default Navigation
