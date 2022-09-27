import Header from "./sub-components/Header";
import Footer from "./sub-components/Footer";
import Titlebar from "./sub-components/Titlebar";
import '../styles/components/Layout.scss'
import React from "react";

type Props = {
   children: any
}


const Layout = ({ children }: Props) => {
   return (
      <>
         <Titlebar />
         {/* <Header /> */}
         <main>{children}</main>
         {/* <Footer /> */}
      </>

   )
}
export default Layout;