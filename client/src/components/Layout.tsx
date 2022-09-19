import Header from "./sub-components/Header";
import Footer from "./sub-components/Footer";
import '../styles/components/Layout.scss'

const Layout = ({ children }: any ) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>

  )
}
export default Layout;