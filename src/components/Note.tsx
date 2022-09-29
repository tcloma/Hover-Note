import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/components/Note.scss'
import MarkdownPreview from '@uiw/react-markdown-preview';


type Props = {
   id: number,
   title: string,
   content: string
   setCurrentNoteId?: any
}


const Note = ({ title, content, id, setCurrentNoteId }: Props) => {
   const navigate = useNavigate()

   const notePageRoute = () => {
      setCurrentNoteId(id)
      navigate(`/note/${id}`)
   }

   // console.log('id: ', id)

   return (
      <div
         className="note"
         onClick={() => notePageRoute()}
      >
         <MarkdownPreview
            source={content}
            style={{
               backgroundColor: 'transparent',
               height: '100vh'
            }}
         />
         {/* <h1>{title}</h1>
         <p>{content}</p> */}
      </div>
   )
}

export default Note