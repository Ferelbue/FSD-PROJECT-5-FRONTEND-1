
import { Header } from "../../common/Header/Header";
import './LogOut.css'

export const LogOut = () => {

   localStorage.removeItem("passport")
   // const token = localStorage.getItem("token");


   return (
      <>
         <Header />
         <div className='logOutDesign'>
            Soy log out
         </div>
      </>

   )
}