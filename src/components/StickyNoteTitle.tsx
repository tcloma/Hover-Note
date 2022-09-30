import { useNavigate } from 'react-router-dom';
// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMinimize, faWindowClose, faPenToSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { Dispatch, SetStateAction } from 'react';

type Props = {
   previewNote: boolean,
   setPreviewNote: Dispatch<SetStateAction<boolean>>
}

const StickyNoteTitle = ({ previewNote, setPreviewNote }: Props) => {
   const titleBar = window.electron.titleBarApi

   return (
      <div className='title-bar'>
         <h3> H </h3>
         <div className='control-buttons'>
            <button
               title='Minimize'
               onClick={() => {
                  setPreviewNote(!previewNote)
               }}
            >
               {previewNote ?
                  <FontAwesomeIcon icon={faPenToSquare} />
                  :
                  <FontAwesomeIcon icon={faSquareCheck} />
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

export default StickyNoteTitle