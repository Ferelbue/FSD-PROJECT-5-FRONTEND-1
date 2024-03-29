
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";
import './LogOut.css'

export const LogOut = () => {

   localStorage.removeItem("passport")
   const navigate = useNavigate();

   return (
      <>
         <Header />
         <div className='logOutDesign'>
         {navigate("/")}
         </div>
      </>

   )
}