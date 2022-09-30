import Titlebar from './Titlebar';
import '../styles/components/Layout.scss'
import React, { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
   children: ReactNode,
   isSticky: Dispatch<SetStateAction<boolean>>
}


const Layout = ({ children, isSticky }: Props) => {
   return (
      <>
         <Titlebar />
         <main>{children}</main>
      </>

   )
}
export default Layout;