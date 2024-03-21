import { CustomLink } from "../CustomLink/CustomLink";
import "./Header.css";


export const Header = () => {

  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));
  
  return (
    <div className="headerDesign">
      {token ? (
        <div className="menu">
          <CustomLink title="Timeline" destination="/timeline" />
          <CustomLink title={`${user.userName.toUpperCase()}`} destination="/profile" />
          <CustomLink title="Posts" destination="/posts" />
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