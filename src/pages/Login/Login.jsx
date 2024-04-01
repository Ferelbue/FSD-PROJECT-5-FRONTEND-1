import { useEffect, useState } from "react";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validame } from "../../utils/functions";
import "./Login.css";
import { LoginUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { Header } from "../../common/Header/Header";
import Spinner from 'react-bootstrap/Spinner';

export const Login = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const [loadedData, setLoadedData] = useState(false);
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });
  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [msgError, setMsgError] = useState("");
  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (tokenStorage) {
      navigate("/");
    }
    setTimeout(() => {
      setLoadedData(true);
    }, 1000);

  }, [tokenStorage]);

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);

    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const loginMe = async () => {
    try {
      for (let elemento in credenciales) {
        if (credenciales[elemento] === "") {
          throw new Error("Todos los campos tienen que estar rellenos");
        }
      }

      const fetched = await LoginUser(credenciales);

      if (fetched) {
        const decodificado = decodeToken(fetched.token);

        const passport = {
          token: fetched.token,
          decodificado: decodificado,
          password: credenciales.password,
        };

        localStorage.setItem("passport", JSON.stringify(passport));

        setMsgError(
          `WELCOME BACK ${(decodificado.userName).toUpperCase()}`
        );
      }
      setTimeout(() => {
        navigate("/");
      }, 1000);


    } catch (error) {
      console.log(error);
      setMsgError(`Error: ${error.message}`);

      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  };

  return (
    <>
      <Header />
      <div className='loginDesign'>
        {!loadedData ? (
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="cardLoginDesign">
            <CustomInput
              className={`inputDesign ${credencialesError.emailError !== "" ? "inputDesignError" : ""
                }`}
              type={"email"}
              placeholder={"Email..."}
              name={"email"}
              value={credenciales.email || ""}
              onChangeFunction={(e) => inputHandler(e)}
              onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{credencialesError.emailError}</div>
            <CustomInput
              className={`inputDesign ${credencialesError.passwordError !== "" ? "inputDesignError" : ""
                }`}
              type={"password"}
              placeholder={"Password..."}
              name={"password"}
              value={credenciales.password || ""}
              onChangeFunction={(e) => inputHandler(e)}
              onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{credencialesError.passwordError}</div>

            <CustomButton
              className={"cButtonDesign"}
              title={"Login"}
              functionEmit={loginMe}
            />
            <div className="error">{msgError}</div>
          </div>
        )}
      </div>
    </>
  );
};
