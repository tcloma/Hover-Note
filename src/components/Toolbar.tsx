import React from 'react'
import { Button, HStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faCopy, faTrash } from '@fortawesome/free-solid-svg-icons'

type Props = {

}

const Toolbar = ({ }: Props) => {
   return (
      <HStack
         top='50px' right='0'
         pos='fixed' zIndex='overlay'
         color='whiteAlpha.900'
      >
         <Button variant='ghost' _hover={{
            'backgroundColor': 'teal.500'
         }}>
            <FontAwesomeIcon icon={faSave} />
         </Button>
         <Button variant='ghost' _hover={{
            'backgroundColor': 'teal.500'
         }}> <FontAwesomeIcon icon={faCopy} /> </Button>
         <Button variant='ghost' _hover={{
            'backgroundColor': 'red.500'
         }}><FontAwesomeIcon icon={faTrash} /></Button>
      </HStack>
   )
}

export default Toolbar