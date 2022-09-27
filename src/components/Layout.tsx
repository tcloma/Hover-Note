import Titlebar from './Titlebar';
import '../styles/components/Layout.scss'
import React from "react";

type Props = {
   children: any
}


const Layout = ({ children }: Props) => {
   return (
      <>
         <Titlebar />
         <main>{children}</main>
      </>

   )
}
export default Layout;