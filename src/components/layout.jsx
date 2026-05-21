import {Outlet} from "react-router-dom"
import NavBare from "../pages/navBare"
import Footer from "../pages/footer"

function Layout(){
    return (
        <>
        <NavBare/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default Layout