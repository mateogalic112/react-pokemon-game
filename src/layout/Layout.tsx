import { VStack, Container } from '@chakra-ui/react'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack background="blue.900" minH="100vh">
      <Container maxW="container.xl" pb={16} mx="auto">
        {children}
      </Container>
    </VStack>
  )
}

export default Layout
