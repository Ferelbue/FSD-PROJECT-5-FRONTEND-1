import React, { useState, useEffect } from "react";
import './Appointments.css';
import { Header } from "../../common/Header/Header";
import { GetAppointments, deleteAppointment } from "../../services/apiCalls";
import { CustomDelete } from "../../common/CustomDelete/CustomDelete";
import Spinner from 'react-bootstrap/Spinner';
import { CustomButton } from "../../common/CustomButton/CustomButton";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export const Appointments = () => {

  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const [appointmentsData, setAppoinmentsData] = useState();
  const [error, setError] = useState();
  const [loadedData, setLoadedData] = useState(false);
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);

  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage]);

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const data = await GetAppointments(tokenStorage);
        setAppoinmentsData(data);

        setTimeout(() => {
          setLoadedData(true);

        }, 1000);

      } catch (error) {
        setError(error);
      }
    };

    fetchUserAppointments();
  }, []);

  const handleDelete = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId, tokenStorage);

      const updatedAppointmentData = await GetAppointments(tokenStorage);
      setAppoinmentsData(updatedAppointmentData);

    } catch (error) {
      setError(error);
    }
  };

  const carouselSize = 3;
  const arrayAppointments = [];
  if (appointmentsData && appointmentsData.data) {
    for (let i = 0; i < appointmentsData.data.length; i += carouselSize) {
      arrayAppointments.push(appointmentsData.data.slice(i, i + carouselSize));
    }
  }

  return (
    <>
      <Header />
      <div className='myAppointmentsDesign'>
        {!loadedData ? (
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <div >
              <CustomButton
                className={"cButtonDesign"}
                title={"NEW APPOINTMENT"}
                functionEmit={() => navigate("/newAppointment")}
              />
            </div>

            <div>
              <Carousel>
                {arrayAppointments.map((appointmentGroup, groupIndex) => (
                  <Carousel.Item key={groupIndex}>
                    <div className="d-flex justify-content-around responsive">
                      {appointmentGroup.map((appointment, index) => (
                        <Card key={index} className="myAppointmentsCardDesign">
                          <Card.Img className="imageServiceCard" variant="top" src={appointment.service?.image} />
                          <Card.Body>
                            <Card.Title>{appointment.service?.serviceName}</Card.Title>
                            <Card.Text className="dateAppointment">{dayjs(appointment.appointmentDate).format("YYYY-MM-DD")}</Card.Text>
                          </Card.Body>
                          <div className="cardButtons">
                            <CustomDelete className="linkAdmin" title={`DELETE`} onClick={() => handleDelete(appointment.id)} />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </>
        )}
      </div>
    </>
  );
};