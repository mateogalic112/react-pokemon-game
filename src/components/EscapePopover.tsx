import {
  Button,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const EscapePopover = () => {
  let navigate = useNavigate()
  const onEscape = () => {
    navigate('/game')
  }

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button>Escape</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent maxW="240">
          <PopoverHeader>Are you sure?</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button colorScheme="blue" onClick={onEscape}>
              Escape
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default EscapePopover
