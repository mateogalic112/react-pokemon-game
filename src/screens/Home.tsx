import { Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Heading>Choose pokemon</Heading>
      <nav>
        <Link to="battlefield">Battlefield</Link>
      </nav>
    </div>
  )
}

export default Home
