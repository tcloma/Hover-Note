import React from "react"
import Note from "../components/Note"
import styles from '../styles/pages/HomePage.module.scss'
import { IUserData } from '../interfaces'

type Props = {
   userFiles: IUserData[],
   setCurrentNoteId: any
}

const HomePage = ({ userFiles, setCurrentNoteId }: Props) => {
   return (
      <div className={styles.page}>
         <h1>Welcome back</h1>
         <h3>Recent Notes</h3>
         <button onClick={() => {
            window.electron.windowApi.newWindow()
         }}> test </button>
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