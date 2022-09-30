import { useNavigate } from 'react-router-dom';
// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark, faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from 'react';

type Props = {
   previewNote: boolean,
   setPreviewNote: Dispatch<SetStateAction<boolean>>
}

const StickyNoteTitle = ({ previewNote, setPreviewNote }: Props) => {
   const titleBar = window.electron.titleBarApi

   return (
      <div className='title-bar'>
         <h3> <FontAwesomeIcon icon={faPaperPlane} /> </h3>
         <div className='control-buttons'>
            <button
               style={{ width: '10vw' }}
               title={previewNote ? 'Edit' : 'Confirm'}
               onClick={() => {
                  setPreviewNote(!previewNote)
               }}
            >
               {previewNote ?
                  <FontAwesomeIcon icon={faPencil} />
                  :
                  <FontAwesomeIcon icon={faCheck} />
               }
            </button>
            <button
               className='quitBtn'
               style={{ width: '10vw' }}
               title='Quit'
               onClick={() => {
                  titleBar.quit()
               }}
            >
               <FontAwesomeIcon icon={faXmark} />
            </button>
         </div>
      </div>
   )
}

export default StickyNoteTitle