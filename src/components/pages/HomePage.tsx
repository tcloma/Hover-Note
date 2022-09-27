import React from "react"
import Note from "../sub-components/Note"
import styles from '../../styles/components/HomePage.module.scss'

interface IUserData {
   id: number,
   title: string,
   content: string
}

type Props = {
   userFiles: IUserData[],
   setCurrentNoteId?: any
}

const HomePage = ({ userFiles, setCurrentNoteId }: Props) => {
   return (
      <div className={styles.page}>
         <h1>Welcome back</h1>
         <h3>Recent Notes</h3>
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