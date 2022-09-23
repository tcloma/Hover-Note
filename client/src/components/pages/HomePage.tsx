import { useNavigate } from "react-router-dom"
import Note from "../sub-components/Note"
import styles from '../../styles/components/HomePage.module.scss'
import React from 'react';

type Props = {
   user?: String
   data: Array<any>
   setCurrentNoteId?: any
}


const HomePage = ({ user = 'Ty', data, setCurrentNoteId }: Props) => {
   const createBrowserWindow = () => {

   }
   console.log(data)
   return (
      <div className={styles.page}>
         <h1>Welcome back, {user}</h1>
         <button onClick={() => createBrowserWindow()}> New page test </button>
         <h3>Recent Notes</h3>
         <main className={styles.noteContainer}>
            {data.map((item) => {
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