import React, { useState, useEffect } from "react";
import './Appointments.css';
import { Header } from "../../common/Header/Header";
import { GetAppointments, deleteAppointment } from "../../services/apiCalls";
import { CustomDelete } from "../../common/CustomDelete/CustomDelete";
import { CustomLink } from "../../common/CustomLink/CustomLink";
import Spinner from 'react-bootstrap/Spinner';

export const Appointments = () => {

  const [appointmentsData, setAppoinmentsData] = useState();
  const [error, setError] = useState();
  const [loadedData, setLoadedData] = useState(false);
  const token = JSON.parse(localStorage.getItem("passport"));


  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const data = await GetAppointments(token.token);
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

      const updatedAppointmentData = await GetAppointments(token.token);
      setAppoinmentsData(updatedAppointmentData);

    } catch (error) {
      setError(error);
    }
  };



  return (
    <>
      <Header />
      <div className='appointmentsDesign'>
        {!loadedData ? (
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <div className="newAppointment">
              <CustomLink title="NEW APPOINTMENT" destination="/newAppointment" />
            </div>

            <div>
              {appointmentsData && appointmentsData.data.map((appointment, index) => (
                <div key={index} className='appointmentsCardDesign'>
                  <div className="body">
                    <p>{appointment.id}</p>
                    <p>{appointment.appointmentDate}</p>
                    <p>{appointment.service.serviceName}</p>
                  </div>

                  <CustomDelete title={`DELETE`} onClick={() => handleDelete(appointment.id)} />

                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};