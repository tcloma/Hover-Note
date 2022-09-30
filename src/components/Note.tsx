// Hooks
import React, { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'

// Dependencies / libraries
import MarkdownPreview from '@uiw/react-markdown-preview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/components/Note.scss'

type Props = {
   id: number,
   title: string,
   content: string,
   setCurrentNoteId: Dispatch<SetStateAction<number>>,
}


const Note = ({ title, content, id, setCurrentNoteId }: Props) => {
   // Shorthand definitions
   const navigate = useNavigate()
   const windowAPi = window.electron.windowApi

   const notePageRoute = () => {
      setCurrentNoteId(id)
      navigate(`/note/${id}`)
   }

   const stickyWindowPopup = () => {
      windowAPi.newWindow(id)
   }

   return (
      <div className="note">
         <button onClick={() => stickyWindowPopup()}>
            <FontAwesomeIcon icon={faPlus} />
         </button>
         <div onClick={() => notePageRoute()}>
            <MarkdownPreview
               source={content}
               style={{
                  backgroundColor: 'transparent',
                  height: '100vh'
               }}
            />
         </div>
      </div>
   )
}

export default Note