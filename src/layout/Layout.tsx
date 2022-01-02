import { VStack, Container } from '@chakra-ui/react'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack background="blue.900">
      <Container maxW="container.xl">{children}</Container>
    </VStack>
  )
}

export default Layout
