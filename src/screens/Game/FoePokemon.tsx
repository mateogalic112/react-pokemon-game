import { Image } from '@chakra-ui/react'

const FoePokemon = ({ image, name }: { image: string; name: string }) => {
  console.log(image, name)

  return (
    <div>
      <Image src={image} alt={name} width="20px" height="20px" />
    </div>
  )
}

export default FoePokemon
