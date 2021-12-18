import { Flex, Box, Heading, Spacer, Button } from '@chakra-ui/react'

const Navigation = () => {
  return (
    <Flex py="3" alignItems="center">
      <Box pr="4">
        <Heading size="xl">Pokemon</Heading>
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
