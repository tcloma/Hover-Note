import React, { useState } from 'react'
import styles from '../../styles/components/NotePage.module.scss'

type Props = {
   noteData?: {
      id: number,
      title: string,
      content: string
   }
}

const NotePage = ({ noteData }: Props) => {
   const { id, title, content } = noteData
   // console.log(noteData)

   const createNewWindow = () => {
      console.log('clicked')
      // ipcRenderer.send('NEWWINDOW')
   }
   W
   return (
      <div className={styles.page}>
         {/* <button onClick={() => createNewWindow()}>Popup</button>
         <h1>{title}</h1>
         <p>{content}</p> */}
         <div className={styles.editor}>
         </div>
      </div>
   )
}

export default NotePage