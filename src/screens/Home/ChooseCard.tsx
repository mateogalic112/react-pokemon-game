import { Button, VStack, Image } from '@chakra-ui/react'

export interface IChooseCardProps {
  src: string
  alt: string
  onClick: () => void
}

const ChooseCard = ({ src, alt, onClick }: IChooseCardProps) => {
  return (
    <VStack maxW="sm">
      <Image src={src} alt={alt} h="160px" />

      <Button onClick={onClick}>Choose</Button>
    </VStack>
  )
}

export default ChooseCard
