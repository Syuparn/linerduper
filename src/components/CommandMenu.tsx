import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import { CommandContext } from '../contexts/CommandContext'

function CommandMenu({ commands }: { commands: string[] }) {
  const { command, setCommand } = useContext(CommandContext)

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        colorScheme='gray'
      >
        {command}
      </MenuButton>
      <MenuList>
        {commands.map((c, i) => {
          return (
            <MenuItem
              onClick={() => setCommand(c)}
              key={i}
              color='black'
              fontSize='lg'
            >
              {c}
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}

export default CommandMenu
