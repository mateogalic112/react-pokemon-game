import { useState } from 'react'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react'
import { useLogin } from '../../api/auth/useLogin'

const initialLoginData = {
  email: '',
  password: '',
}

const LoginPage = () => {
  const login = useLogin()

  const [loginData, setLoginData] = useState(initialLoginData)
  const handleLoginDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const authData = await login.mutateAsync(loginData)
    console.log({ authData })
  }

  const [showPassword, setShowPassword] = useState(false)
  const handleShowClick = () => setShowPassword(!showPassword)

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.500"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    type="email"
                    placeholder="email address"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginDataChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginDataChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={login.isLoading}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{' '}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  )
}

export default LoginPage
