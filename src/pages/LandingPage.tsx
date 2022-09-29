import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/LandingPage.module.scss';

type Props = {
   dirName: string,
   setDirName: any
}

const LandingPage = ({ dirName, setDirName }: Props) => {
   const [showDir, setShowDir] = useState<boolean>(false)
   // Defining hooks
   const navigate = useNavigate()
   const dialogApi = window.electron.dialogApi

   const handleSubmit = (e: any) => {
      e.preventDefault();
      navigate('/home')
   }

   const handleBrowseClick = () => {
      dialogApi.openDialog()
      const pathPolling = setInterval(() => {
         console.log('Polling...')
         const path = dialogApi.getPath()
         if (path) {
            clearInterval(pathPolling)
            console.log(path)
            setDirName(path)
         }
      }, 1000)
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