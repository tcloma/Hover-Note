import { useNavigate } from "react-router-dom"
import Note from "../sub-components/Note"
import styles from '../../styles/components/HomePage.module.scss'
import React from 'react';

type Props = {
   user?: string
}

const HomePage = ({ user = 'Ty' }: Props) => {
   const navigate = useNavigate()

   const createBrowserWindow = () => {
      window.open(
         'http://localhost:5173/note', '',
         'width=320, height=320'
      )
   }

   return (
      <div className={styles.page}>
         <h1>Welcome back, {user}</h1>
         <button onClick={() => navigate('/')}> Go to landing </button>
         <button onClick={() => createBrowserWindow()}> New page </button>
         <h3>Recent Notes</h3>
         <main className={styles.noteContainer}>
            <Note
               title="Test"
               content="This is a test note"
            />
            <Note
               title="Test2"
               content="This is a test note"
            />
            <Note
               title="Test3"
               content="This is a test note"
            />
            <Note
               title="Test4"
               content="This is a test note"
            />
         </main>
      </div>
   )
}

export default HomePage