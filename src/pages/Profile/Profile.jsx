import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import './Profile.css';
import { Header } from "../../common/Header/Header";
import { GetProfile } from "../../services/apiCalls";

export const Profile = () => {
  const [profileData, setProfileData] = useState();
  const [error, setError] = useState();

  const token = JSON.parse(localStorage.getItem("passport"));
  console.log(token.token)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await GetProfile(token.token);
        setProfileData(data);
        console.log(data)
      } catch (error) {
        setError(error);
      }
    };

    fetchUserProfile();
    // console.log("esto",profileData.data.image)
  }, []);

  return (
    <>
      <Header />
      <div className='profileDesign'>
        <div className='profileCardDesign'>
          {profileData && (
            <>
              {/* <div className="main"> */}
                <div className="user">
                  <p>Nombre: {profileData.data[0].firstName}</p>
                  <p>Correo electrónico: {profileData.data[0].email}</p>
                  <img className="img" src={profileData.data[0].image} alt="pers1" />
                </div>
                <div className="appointment">
                <p className="center">Citas:</p>
                {profileData.data[0].appointments.map((appointment, index) => (
                    <div>
                    <p>Fecha: {dayjs(appointment.appointmentDate).format("YYYY-MM-DD")} - Servicio: {appointment.service.serviceName}</p>
                    
                  </div>
                ))}

              </div>
              {/* </div>  */}
            </>
          )}
        </div>
      </div>
    </>
  );
};