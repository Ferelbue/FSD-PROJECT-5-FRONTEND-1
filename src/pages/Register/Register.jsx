import { useState } from "react";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import "./Register.css";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { RegisterUser } from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";

export const Register = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    image: "",
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    firstNameError: "",
    lastNameError: "",
    imageError: "",
    emailError: "",
    passwordError: "",
  });

  const [msgError, setMsgError] = useState("");

  //funcion emit que está aqui en el padre... que se la pasamos al custom input
  const inputHandler = (e) => {
    //voy a proceder a bindear....
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
      //el truco del almendruco nos dice que seria... nameError: error, o emailError: error
    }));
  };

  //function emit que también está aqui en el padre...en este caso para registrar...
  const registerMe = async () => {
    try {
      for (let elemento in user) {
        if (user[elemento] === "") {
          throw new Error("Todos los campos tienen que estar rellenos");
        }
      }

      const fetched = await RegisterUser(user);

      setMsgError(fetched.message)

      setTimeout(() => {
        navigate("/")
      }, 1200)

    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="registerDesign">
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        <CustomInput
          className={`inputDesign ${userError.firstNameError !== "" ? "inputDesignError" : ""
            }`}
          type={"text"}
          placeholder={"firstName"}
          name={"firstName"}
          value={user.firstName || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.firstNameError}</div>
        <CustomInput
          className={`inputDesign`}
          type={"text"}
          placeholder={"lastName"}
          name={"lastName"}
          value={user.lastName || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <CustomInput
          className={`inputDesign`}
          type={"text"}
          placeholder={"image"}
          name={"image"}
          value={user.image || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.imageError}</div>
        <CustomInput
          className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
            }`}
          type={"email"}
          placeholder={"email"}
          name={"email"}
          value={user.email || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.emailError}</div>
        <CustomInput
          className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
            }`}
          type={"password"}
          placeholder={"password"}
          name={"password"}
          value={user.password || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.passwordError}</div>
        <CustomButton
          className={"cButtonDesign"}
          title={"Register"}
          functionEmit={registerMe}
        />
        <div className="error">{msgError}</div>
      </div>
    </>
  );
};
