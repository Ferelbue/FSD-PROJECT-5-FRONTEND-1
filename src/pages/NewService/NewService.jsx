import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NewService.css";
import { CreateService } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { Header } from "../../common/Header/Header";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { validame } from "../../utils/functions";
import Spinner from 'react-bootstrap/Spinner';
import { decodeToken } from "react-jwt";

export const NewService = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
  const [loadedData, setLoadedData] = useState(true);
  const decodificado = decodeToken(datosUser.token);
  const passport = {
    token: datosUser.token,
    decodificado: decodificado
  };
  const [service, setService] = useState({
    serviceName: "",
    description: "",
    image: "",
  });
  const [serviceError, setServiceError] = useState({
    serviceNameError: "",
    descriptionError: "",
    imageError: "",
  });

  useEffect(() => {
    if (!tokenStorage || (datosUser?.decodificado.roleName !== "admin")) {
      navigate("/");
    }
  }, [tokenStorage]);

  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage]);

  const inputHandler = (e) => {
    setService((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);

    setServiceError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,

    }));
  };

  const createMe = async () => {
    try {
      const serviceSend = {
        serviceName: service.serviceName,
        description: service.description,
        image: service.image,
      };

      const fetched = await CreateService(tokenStorage, serviceSend);

      setError(fetched.message);

      setTimeout(() => {

        navigate("/servicesAdmin")
      }, 1200)

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="serviceDesign">
        {!loadedData ? (
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="serviceCardDesign">
            <div className="cardServiceUp">
              <div className="serviceData">
                <div className="inputServiceFormat">
                  <div>
                    <div className="inputServiceTitle">SERVICE NAME:</div>
                  </div>
                  <div>
                    <CustomInput
                      className={`inputDesign`}
                      type={"text"}
                      placeholder={""}
                      name={"serviceName"}
                      value={service.serviceName || ""}
                      onChangeFunction={(e) => inputHandler(e)}
                      onBlurFunction={(e) => checkError(e)}
                    />

                  </div>
                </div>

                <div className="inputByIdFormat">
                  <div>
                    <div className="inputServiceTitle">DESCRIPTION NAME:</div>
                  </div>
                  <div>
                    <CustomInput
                      className={`inputDesign`}
                      type={"text"}
                      placeholder={""}
                      name={"description"}
                      value={service.description || ""}
                      onChangeFunction={(e) => inputHandler(e)}
                      onBlurFunction={(e) => checkError(e)}
                    />

                  </div>
                </div>

                <div className="inputByIdFormat">
                  <div>
                    <div className="inputServiceTitle">SERVICE IMAGE:</div>
                  </div>
                  <div>
                    <CustomInput
                      className={`inputDesign`}
                      type={"text"}
                      placeholder={""}
                      name={"image"}
                      value={service.image || ""}
                      onChangeFunction={(e) => inputHandler(e)}
                      onBlurFunction={(e) => checkError(e)}
                    />

                  </div>
                </div>
              </div>
              <div className="serviceImage">
                <div className="inputImageServiceTitle">SERVICE IMAGE:</div>
                <img className="imageServiceFormat" src={service.image} alt="service" />
              </div>
            </div>
            <div className="cardServiceDown">
              <CustomButton
                className={"cButtonDesign cButtonGreen"}
                title={"Send"}
                functionEmit={() => createMe()}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
