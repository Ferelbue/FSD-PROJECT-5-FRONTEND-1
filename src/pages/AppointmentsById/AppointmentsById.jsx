import React, { useState, useEffect } from "react";
import './AppointmentsById.css';
import { Header } from "../../common/Header/Header";
import { GetAppointments, deleteAppointment, getAppointmentsById } from "../../services/apiCalls";
import { CustomDelete } from "../../common/CustomDelete/CustomDelete";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from "react-router-dom";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import Carousel from 'react-bootstrap/Carousel';
import { Card } from "react-bootstrap";
import dayjs from "dayjs";

export const AppointmentsById = () => {

  const [appointmentsData, setAppoinmentsData] = useState();
  const [error, setError] = useState();
  const [loadedData, setLoadedData] = useState(false);
  const token = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const { userId } = useParams();

  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage]);
  
  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const data = await getAppointmentsById(token.token, userId);
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

      await deleteAppointment(appointmentId, token.token);

      const updatedAppointmentData = await getAppointmentsById(token.token, userId);
      setAppoinmentsData(updatedAppointmentData);

    } catch (error) {
      setError(error);
    }
  };

  const carouselSize = 3;
  const arrayAppointments = [];
  if (appointmentsData && appointmentsData?.data) {
    for (let i = 0; i < appointmentsData?.data.length; i += carouselSize) {
      arrayAppointments.push(appointmentsData?.data.slice(i, i + carouselSize));
    }
  }
  console.log(arrayAppointments)

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