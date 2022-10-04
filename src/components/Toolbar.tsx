import React from 'react'
import { Button, HStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faCopy, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

type Props = {
   name: string,
   editorValue: string,
   isHome: boolean
}

const Toolbar = ({ name, editorValue, isHome }: Props) => {
   return (
      <HStack
         top='50px' right='0'
         pos='fixed' zIndex='overlay'
         color='whiteAlpha.900'
      >
         {isHome ?
            <Button variant='ghost'
               _hover={{
                  'backgroundColor': 'teal.500'
               }}
            >
               <FontAwesomeIcon icon={faPlus} />
            </Button>
            :
            <>
               <Button
                  variant='ghost'
                  title='save'
                  _hover={{
                     'backgroundColor': 'teal.500'
                  }}
                  onClick={() => {
                     window.electron.filesApi.writeFile(name, editorValue)
                     // console.log(name, editorValue)
                  }}
               >
                  <FontAwesomeIcon icon={faSave} />
               </Button>
               <Button
                  variant='ghost'
                  title='hover'
                  _hover={{
                     'backgroundColor': 'teal.500'
                  }}
               >
                  <FontAwesomeIcon icon={faCopy} />
               </Button>
               <Button
                  variant='ghost'
                  title='delete'
                  _hover={{
                     'backgroundColor': 'red.500'
                  }}
               >
                  <FontAwesomeIcon icon={faTrash} />
               </Button>
            </>
         }
      </HStack>
   )
}

export default Toolbar