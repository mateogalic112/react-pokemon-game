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

interface IEscapePopoverProps {
  onClick: () => void
}

const EscapePopover = ({ onClick }: IEscapePopoverProps) => {
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
            <Button colorScheme="blue" onClick={onClick}>
              Escape
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default EscapePopover
