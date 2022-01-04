import { Image } from '@chakra-ui/react'

interface ICardImageProps {
  src: string
  alt: string
  isStruggling?: boolean
  isAttacking: boolean
  isDamaging: boolean
  isOpponent?: boolean
}

const CardImage = ({
  src,
  alt,
  isStruggling,
  isAttacking,
  isDamaging,
  isOpponent,
}: ICardImageProps) => {
  const className = ['pokemonImage']

  switch (true) {
    case isStruggling:
      className.push('struggling')
      break
    case isAttacking && !isOpponent:
      className.push('attacking')
      break
    case isAttacking && isOpponent:
      className.push('opponentAttacking')
      break
    case isDamaging:
      className.push('damaging')
      break
    default:
      break
  }

  return (
    <Image
      className={className.join(' ')}
      boxSize="100px"
      mx="auto"
      my="2"
      src={src}
      alt={alt}
    />
  )
}

export default CardImage
