import React, { Dispatch, ReactNode, SetStateAction } from "react";
import Titlebar from './Titlebar';
import '../styles/components/Layout.scss'
import StickyNoteTitle from "./StickyNoteTitle";

type Props = {
   children: ReactNode,
   stickyNote: boolean,
   previewNote: boolean,
   setPreviewNote: Dispatch<SetStateAction<boolean>>
}


const Layout = ({ children, stickyNote, previewNote,setPreviewNote }: Props) => {
   return (
      <>
         {stickyNote ?
            <StickyNoteTitle previewNote={previewNote} setPreviewNote={setPreviewNote} />
            :
            <Titlebar />
         }
         <main>{children}</main>
      </>

   )
}
export default Layout;