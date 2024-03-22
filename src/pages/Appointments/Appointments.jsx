import React, { useState, useEffect } from "react";
import './Appointments.css';
import { Header } from "../../common/Header/Header";
import { GetAppointments, deleteAppointment} from "../../services/apiCalls";
import { CustomDelete } from "../../common/CustomDelete/CustomDelete";


export const Appointments = () => {

  const [appointmentsData, setAppoinmentsData] = useState();
  const [error, setError] = useState();

  const token = JSON.parse(localStorage.getItem("passport"));


  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const data = await GetAppointments(token.token);
        setAppoinmentsData(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchUserAppointments();
  }, []);

  const handleDelete = async (appointmentId) => {
    try {
      // Realizar una solicitud PUT a la base de datos para actualizar el post con el like
      console.log(appointmentId)
      await deleteAppointment(appointmentId, token.token);

      // Actualizar los datos de los posts después de la actualización exitosa
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
  );
};