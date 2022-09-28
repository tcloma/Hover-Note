import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/LandingPage.module.scss';

type Props = {}

const LandingPage = (props: Props) => {
   const [showDir, setShowDir] = useState<boolean>(false)
   const [dirName, setDirName] = useState<string>('')
   // Defining hooks
   const navigate = useNavigate()

   return (
      <div className={styles.page}>
         <h1> Welcome to <span className={styles.titletext}>Hover</span> </h1>
         {showDir ?
            <div className={styles.directory}>
               <input
                  type='text'
                  placeholder='Enter file directory: '
                  value={dirName}
                  onChange={(e) => setDirName(e.target.value)}
               />
               <button onClick={() => {

               }}> Browse </button>
            </div>
            :
            <h6 onClick={() => setShowDir(!showDir)}> Click to continue </h6>
         }
      </div >
   )
}

export default LandingPage