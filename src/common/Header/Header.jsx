import { CustomLink } from "../CustomLink/CustomLink";
import "./Header.css";


export const Header = () => {

  const token = JSON.parse(localStorage.getItem("passport"));
  
  return (
    <div className="headerDesign">
      {token ? (
        <div className="menu">
          <CustomLink title="Timeline" destination="/timeline" />
          <CustomLink title="Appointments" destination="/appointments" />
          <CustomLink title={`${token.decodificado.userName.toUpperCase()}`} destination="/profile" />
          <CustomLink title="Log-out" destination="/logout" />
        </div>
      ) : (
        <div className="menu">
          <CustomLink title="Home" destination="/" />
          <CustomLink title="Login" destination="/login" />
          <CustomLink title="Register" destination="/register" />
        </div>
      )}
    </div>
  );
};