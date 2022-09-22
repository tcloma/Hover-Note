import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMinimize, faWindowMaximize, faWindowClose, faWindowRestore } from "@fortawesome/free-regular-svg-icons";

const electron = window.require('electron')
const { ipcRenderer } = electron

type Props = {}
const Titlebar = (props: Props) => {
   const [windowMaximize, setWindowMaximize] = useState(false)

   ipcRenderer.on('isMaximized', () => {
      setWindowMaximize(true)
   })
   ipcRenderer.on('isRestored', () => {
      setWindowMaximize(false)
   })

   return (
      <div className='title-bar'>
         <h3> Hover </h3>
         <div className='control-buttons'>
            <button
               title='Minimize'
               onClick={() => {
                  ipcRenderer.send('MINIMIZE')
               }}>
               <FontAwesomeIcon icon={faWindowMinimize} />
            </button>
            <button
               title={windowMaximize ? 'Restore' : 'Maximize'}
               onClick={() => {
                  ipcRenderer.send('MAXIMIZE')
               }}>

               {windowMaximize ?
                  <FontAwesomeIcon icon={faWindowRestore} />
                  : <FontAwesomeIcon icon={faWindowMaximize} />}

            </button>
            <button
               className='quitBtn'
               title='Quit'
               onClick={() => {
                  ipcRenderer.send('QUIT')
               }}>
               <FontAwesomeIcon icon={faWindowClose} />
            </button>
         </div>
      </div>
   )
}

export default Titlebar