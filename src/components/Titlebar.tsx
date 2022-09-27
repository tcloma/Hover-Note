import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMinimize, faWindowMaximize, faWindowClose, faWindowRestore } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from 'react-router-dom';

type Props = {}

const Titlebar = ({ }: Props) => {
   // Local state definitions
   const [windowMaximize, setWindowMaximize] = useState(true)

   // Local API definitions
   const navigate = useNavigate()
   const titleBar = window.electron.titleBarApi

   return (
      <div className='title-bar'>
         <h3 onClick={() => navigate('/')}> Hover </h3>
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
                  titleBar.quit()
               }}
            >
               <FontAwesomeIcon icon={faWindowClose} />
            </button>
         </div>
      </div>
   )
}

export default Titlebar