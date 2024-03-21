import React, { useState, useEffect } from "react";
import './Appointments.css';
import { Header } from "../../common/Header/Header";
import { GetAppointments} from "../../services/apiCalls";
import { CustomLink } from "../../common/CustomLink/CustomLink";


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

  // const handleDelete = async (postId) => {
  //   try {
  //     // Realizar una solicitud PUT a la base de datos para actualizar el post con el like
  //     await deletePost(postId, token);

  //     // Actualizar los datos de los posts después de la actualización exitosa
  //     const updatedPostsData = await getUserPosts(token);
  //     setPostsData(updatedPostsData);
      
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

console.log(appointmentsData)

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

              <CustomLink title={`DELETE`} onClick={() => handleDelete(post._id)} />

          </div>
        ))}
      </div>
    </>
  );
};