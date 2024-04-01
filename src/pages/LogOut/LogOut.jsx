
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";
import './LogOut.css'
import { useEffect } from "react";

export const LogOut = () => {

   localStorage.removeItem("passport")
   const navigate = useNavigate();

   useEffect(() => {
      
      navigate('/');

   }, []);

   return (
      <>
         <Header />
         <div className='logOutDesign'>

         </div>
      </>

   )
}