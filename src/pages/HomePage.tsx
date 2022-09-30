import React, { SetStateAction, Dispatch } from "react"
import Note from "../components/Note"
import styles from '../styles/pages/HomePage.module.scss'
import { IUserData } from '../interfaces'

type Props = {
   userFiles: IUserData[],
   setCurrentNoteId: Dispatch<SetStateAction<number>>
}

const HomePage = ({ userFiles, setCurrentNoteId }: Props) => {
   return (
      <div className={styles.page}>
         <h1>Note board</h1>
         <main className={styles.noteContainer}>
            {userFiles.map((item) => {
               return (
                  <Note
                     key={item.id}
                     id={item.id}
                     title={item.title}
                     content={item.content}
                     setCurrentNoteId={setCurrentNoteId}
                  />
               )
            })}
         </main>
      </div>
   )
}

export default HomePage