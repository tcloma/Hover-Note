import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/LandingPage.module.scss';
import { useAwaitPoll } from '../functions'

type Props = {
   dirName: string,
   setDirName: Dispatch<SetStateAction<string>>
}

const LandingPage = ({ dirName, setDirName }: Props) => {
   // Local state
   const [showDir, setShowDir] = useState<boolean>(false)

   // Shorthand definitions
   const navigate = useNavigate()
   const dialogApi = window.electron.dialogApi

   const handleSubmit = (e: any) => {
      e.preventDefault();
      navigate('/home')
   }

   const handleBrowseClick = () => {
      dialogApi.openDialog()
      useAwaitPoll(dialogApi.getPath, setDirName)
   }

   return (
      <div className={styles.page}>
         <h1> Welcome to <span className={styles.titletext}>Hover</span> </h1>
         {showDir ?
            <form onSubmit={(e) => handleSubmit(e)} className={styles.directory}>
               <input
                  type='text'
                  placeholder='Enter file directory: '
                  value={dirName}
                  onChange={(e) => setDirName(e.target.value)}
               />
               <button type='button' onClick={() => handleBrowseClick()}> Browse </button>
            </form>
            :
            <h6 onClick={() => setShowDir(!showDir)}> Click to continue </h6>
         }
      </div >
   )
}

export default LandingPage