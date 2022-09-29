import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/components/Note.scss'
import MarkdownPreview from '@uiw/react-markdown-preview';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


type Props = {
   id: number,
   title: string,
   content: string
   setCurrentNoteId?: any,
   userFiles: any
}


const Note = ({ title, content, id, setCurrentNoteId, userFiles }: Props) => {
   const navigate = useNavigate()

   const notePageRoute = () => {
      setCurrentNoteId(id)
      navigate(`/note/${id}`)
   }

   // console.log('id: ', id)

   return (
      <div className="note">
         <button onClick={() => {
            window.electron.windowApi.newWindow(id, userFiles)
         }}>
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
         {/* <h1>{title}</h1>
         <p>{content}</p> */}
      </div>
   )
}

export default Note