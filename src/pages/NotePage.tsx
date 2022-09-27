import React from 'react'
import styles from '../styles/pages/NotePage.module.scss'
import { IUserData } from '../interfaces'

type Props = {
   noteData: IUserData
}

const NotePage = ({ noteData }: Props) => {
   const { id, title, content } = noteData

   const createNewWindow = () => {
      console.log('clicked')
   }

   return (
      <div className={styles.page}>
         <button onClick={() => createNewWindow()}>Popup</button>
         <h1>{title}</h1>
         <p>{content}</p>
         <div className={styles.editor}>
         </div>
      </div>
   )
}

export default NotePage