import { Image } from '@chakra-ui/react'

interface ICardImageProps {
  src: string
  alt: string
  struggle?: boolean
}

const CardImage = ({ src, alt, struggle }: ICardImageProps) => {
  return (
    <Image
      className={`opponentPokemon ${struggle ? 'struggle' : ''}`}
      boxSize="100px"
      mx="auto"
      my="2"
      src={src}
      alt={alt}
    />
  )
}

export default CardImage
