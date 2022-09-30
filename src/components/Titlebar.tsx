// Hooks
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMaximize, faWindowRestore } from '@fortawesome/free-regular-svg-icons';
import { faWindowMinimize, faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Titlebar = () => {
   // Local state definitions
   const [windowMaximize, setWindowMaximize] = useState(true)

   // Local API definitions
   const navigate = useNavigate()
   const titleBar = window.electron.titleBarApi

   return (
      <div className='title-bar'>
         <h3 onClick={() => navigate('/')}> <FontAwesomeIcon icon={faPaperPlane}/> </h3>
         <div className='control-buttons'>
            <button
               title='Minimize'
               onClick={() => {
                  titleBar.minimize()
               }}
            >
               <FontAwesomeIcon icon={faWindowMinimize} />
            </button>
            <button
               title={windowMaximize ? 'Restore' : 'Maximize'}
               onClick={() => {
                  titleBar.maximize()
                  setWindowMaximize(!windowMaximize)
               }}
            >
               {windowMaximize ?
                  <FontAwesomeIcon icon={faWindowRestore} />
                  : <FontAwesomeIcon icon={faWindowMaximize} />
               }
            </button>
            <button
               className='quitBtn'
               title='Quit'
               onClick={() => {
                  titleBar.quit('main')
               }}
            >
               <FontAwesomeIcon icon={faXmark} />
            </button>
         </div>
      </div>
   )
}

export default Titlebar