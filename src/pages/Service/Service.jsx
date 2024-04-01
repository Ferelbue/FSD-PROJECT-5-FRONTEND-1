import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Service.css";
import { getServiceById, updateService } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { Header } from "../../common/Header/Header";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { validame } from "../../utils/functions";
import Spinner from 'react-bootstrap/Spinner';
import { decodeToken } from "react-jwt";

export const Service = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [write, setWrite] = useState("disabled");
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
  const [loadedData, setLoadedData] = useState(false);
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
    const getService = async () => {
      try {
        const fetched = await getServiceById(serviceId, tokenStorage);

        setTimeout(() => {
          setLoadedData(true);

        }, 1000);

        setService({
          serviceName: fetched.data.serviceName,
          description: fetched.data.description,
          image: fetched.data.image,
        });

      } catch (error) {
        console.log(error);
      }
    };

    if (!loadedData) {
      getService();
    }
  }, [service]);
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

  const updateData = async () => {

    try {
      const fetched = await updateService(tokenStorage, serviceId, service)

      setService({
        serviceName: fetched.data.serviceName,
        description: fetched.data.description,
        image: fetched.data.image,
      })

      setWrite("disabled")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      <div className="serviceByIdDesign">
        {!loadedData ? (
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="serviceByIdCardDesign">
            <div className="cardByIdUp">
              <div className="serviceByIdData">
                <div className="inputByIdFormat">
                  <div>
                    <div className="inputByIdTitle">SERVICE NAME:</div>
                  </div>
                  <div>
                    <CustomInput
                      className={`inputDesign ${serviceError.serviceNameError !== "" ? "inputDesignError" : write === "" ? "inputDesignAvaiable" : ""
                        }`}
                      type={"text"}
                      placeholder={""}
                      name={"serviceName"}
                      disabled={write}
                      value={service.serviceName || ""}
                      onChangeFunction={(e) => inputHandler(e)}
                      onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{serviceError.serviceNameError}</div>
                  </div>
                </div>

                <div className="inputByIdFormat">
                  <div>
                    <div className="inputByIdTitle">DESCRIPTION NAME:</div>
                  </div>
                  <div>
                    <CustomInput
                      className={`inputDesign ${serviceError.descriptionError !== "" ? "inputDesignError" : write === "" ? "inputDesignAvaiable" : ""
                        }`}
                      type={"text"}
                      placeholder={""}
                      name={"description"}
                      disabled={write}
                      value={service.description || ""}
                      onChangeFunction={(e) => inputHandler(e)}
                      onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{serviceError.descriptionError}</div>
                  </div>
                </div>

                <div className="inputByIdFormat">
                  <div>
                    <div className="inputByIdTitle">SERVICE IMAGE:</div>
                  </div>
                  <div>
                    <CustomInput
                      className={`inputDesign ${serviceError.imageError !== "" ? "inputDesignError" : write === "" ? "inputDesignAvaiable" : ""
                        }`}
                      type={"text"}
                      placeholder={""}
                      name={"image"}
                      disabled={write}
                      value={service.image || ""}
                      onChangeFunction={(e) => inputHandler(e)}
                      onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{serviceError.imageError}</div>
                  </div>
                </div>
              </div>
              <div className="serviceByIdImage">
                <div className="inputImageByIdTitle">SERVICE IMAGE:</div>
                <img className="imageByIdFormat" src={service.image} alt="service" />
              </div>
            </div>
            <div className="cardByIdDown">
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
