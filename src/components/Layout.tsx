import React, { Dispatch, ReactNode, SetStateAction } from "react";
import Titlebar from './Titlebar';
import StickyNoteTitle from "./StickyNoteTitle";

type Props = {
   children: ReactNode,
   stickyNote: boolean,
   previewNote: boolean,
   setPreviewNote: Dispatch<SetStateAction<boolean>>,
   windowId: number | undefined
}


const Layout = ({ children, stickyNote, previewNote, setPreviewNote, windowId }: Props) => {
   return (
      <>
         {stickyNote ?
            <StickyNoteTitle previewNote={previewNote} setPreviewNote={setPreviewNote} windowId={windowId} />
            :
            <Titlebar />
         }
         <main>{children}</main>
      </>

   )
}
export default Layout;