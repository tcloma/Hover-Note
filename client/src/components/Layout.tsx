import Header from "./sub-components/Header";
import Footer from "./sub-components/Footer";
import '../styles/components/Layout.scss'

type Props = {
   children: any
}


const Layout = ({ children }: Props ) => {
  return (
    <>
      {/* <Header /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>

  )
}
export default Layout;