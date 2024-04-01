import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Profile.css";
import { GetProfile, LoginUser, UpdateProfile } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { Header } from "../../common/Header/Header";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { validame } from "../../utils/functions";
import Spinner from 'react-bootstrap/Spinner';
import { decodeToken } from "react-jwt";


export const Profile = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const [write, setWrite] = useState("disabled");
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
  const [loadedData, setLoadedData] = useState(false);
  const [password, setPassword] = useState();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    image: "",
    email: "",
  });
  const [userError, setUserError] = useState({
    firstNameError: "",
    lastNameError: "",
    imageError: "",
    emailError: "",
  });
  
  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
    setPassword(datosUser?.password)
  }, [tokenStorage]);

  const inputHandler = (e) => {
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

    }));
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const fetched = await GetProfile(tokenStorage);
        setTimeout(() => {
          setLoadedData(true);

        }, 1000);

        setUser({
          firstName: fetched.data[0].firstName,
          lastName: fetched.data[0].lastName,
          image: fetched.data[0].image,
          email: fetched.data[0].email,
        });

      } catch (error) {
        console.log(error);
      }
    };

    if (!loadedData) {
      getUserProfile();
    }
  }, [user]);

  const updateData = async () => {

    try {
      const fetched = await UpdateProfile(tokenStorage, user)
      setUser({
        firstName: fetched.data.firstName,
        lastName: fetched.data.lastName,
        image: fetched.data.image,
        email: fetched.data.email,
      })

      setWrite("disabled")

      const credenciales = {
        email: user.email,
        password: password,
      };
      const fetched2 = await LoginUser(credenciales);

      if (fetched2) {
        const decodificado = decodeToken(fetched2.token);

        const passport = {
          token: fetched2.token,
          decodificado: decodificado,
          password: password,
        };

        localStorage.setItem("passport", JSON.stringify(passport));

        window.location.reload()
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      <div className="profileUserDesign">
        {!loadedData ? (
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="profileUserCardDesign">
            <div className="cardUserUp">
              <div className="userUserData">
                <div className="inputUserFormat">
                  <div>
                    <div className="inputUser">NAME:</div>
                  </div>
                  <div>
                    <CustomInput
                      className={`inputDesign ${userError.firstNameError !== "" ? "inputDesignError" : write === "" ? "inputDesignAvaiable" : ""
                        }`}
                      type={"text"}
                      placeholder={""}
                      name={"firstName"}
                      disabled={write}
                      value={user.firstName || ""}
                      onChangeFunction={(e) => inputHandler(e)}
                      onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{userError.firstNameError}</div>
                  </div>
                </div>

                <div className="inputUserFormat">
                  <div>
                    <div className="inputUser">LAST NAME:</div>
                  </div>
                  <div>
                    <CustomInput
                      className={`inputDesign ${userError.lastNameError !== "" ? "inputDesignError" : write === "" ? "inputDesignAvaiable" : ""
                        }`}
                      type={"text"}
                      placeholder={""}
                      name={"lastName"}
                      disabled={write}
                      value={user.lastName || ""}
                      onChangeFunction={(e) => inputHandler(e)}
                      onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{userError.lastNameError}</div>
                  </div>
                </div>

                <div className="inputUserFormat">
                  <div>
                    <div className="inputUser">PROFILE IMAGE:</div>
                  </div>
                  <div>
                    <CustomInput
                      className={`inputDesign ${userError.imageError !== "" ? "inputDesignError" : write === "" ? "inputDesignAvaiable" : ""
                        }`}
                      type={"text"}
                      placeholder={""}
                      name={"image"}
                      disabled={write}
                      value={user.image || ""}
                      onChangeFunction={(e) => inputHandler(e)}
                      onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{userError.imageError}</div>
                  </div>
                </div>

                <div className="inputUserFormat">
                  <div>
                    <div className="inputUser">EMAIL:</div>
                  </div>
                  <div>
                    <CustomInput
                      className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                        }`}
                      type={"email"}
                      placeholder={""}
                      name={"email"}
                      disabled={"disabled"}
                      value={user.email || ""}
                      onChangeFunction={(e) => inputHandler(e)}
                      onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{userError.emailError}</div>
                  </div>
                </div>
              </div>

              <div className="userImage">
                <div className="inputImageUser">PROFILE IMAGE:</div>
                <img className="imageUser" src={user.image} alt="pers1" />
              </div>
            </div>

            <div className="cardUserDown">

              <CustomButton
                className={write === "" ? "cButtonGreen cButtonDesign" : "cButtonDesign"}
                title={write === "" ? "Confirm" : "Edit"}
                functionEmit={write === "" ? updateData : () => setWrite("")}
              />
            </div>

          </div>
        )}
      </div>
    </>
  );
};
