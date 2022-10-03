import { Flex, Wrap, WrapItem } from "@chakra-ui/react"
import React, { SetStateAction, Dispatch } from "react"
import Note from "../components/Note"
import { IUserData } from '../interfaces'

type Props = {
   userFiles: IUserData[],
   setCurrentNoteId: Dispatch<SetStateAction<number>>
}

const HomePage = ({ userFiles, setCurrentNoteId }: Props) => {
   return (
      <Flex h='100vh' justify='center' align='center' bg='gray.800'>
         <Wrap p='1em' w='95%'spacing='1em' justify='center'>
            {userFiles.map((item) => {
               return (
                  <WrapItem>
                     <Note
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        content={item.content}
                        setCurrentNoteId={setCurrentNoteId}
                     />
                  </WrapItem>
               )
            })}
         </Wrap>
      </Flex>
   )
}

export default HomePage