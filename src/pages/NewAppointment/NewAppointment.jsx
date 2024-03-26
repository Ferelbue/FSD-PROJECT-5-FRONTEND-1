import React, { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Header } from "../../common/Header/Header";
import { CreateAppointment, GetServices } from "../../services/apiCalls";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import './NewAppointment.css';
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

export const NewAppointment = () => {

  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState();
  const [error, setError] = useState();
  const [date, setSelectedDate] = useState();
  const [selectedService, setSelectedService] = useState();
  const [service, setService] = useState();
  const datosUser = JSON.parse(localStorage.getItem("passport"));

  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await GetServices();
        setServiceData(data);

      } catch (error) {
        setError(error);
      }
    };

    fetchServices();
  }, []);

  const handleSelect = (service) => {
    setService(service.serviceName);
    setSelectedService(service.id);
  };


  const handleDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
  };


  const createMe = async () => {
    try {
      const appointmentSend = {
        serviceId: selectedService,
        appointmentDate: date
      };

      const fetched = await CreateAppointment(tokenStorage,appointmentSend);

      setError(fetched.message);

      setTimeout(() => {

        navigate("/appointments")
      }, 1200)

    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <>
      <Header />
      <div className='newappointmentsDesign'>
        <div className="cardNewAppointment">
          <div>
            <div>
              SELECT A SERVICE
            </div>
            <div>
              <Dropdown>
                <Dropdown.Toggle>
                  {service}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {serviceData && serviceData.data.map((service, index) => (
                    <Dropdown.Item key={index} onClick={() => handleSelect(service)}>
                      {service.serviceName}<br />
                      <img src={service.image} alt={`image${index + 1}`} height="100em" />
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <CustomButton
            className={"buttonAppointment"}
            title={"SEND"}
            functionEmit={createMe}
          />
          <div>
            <div>
              SELECT A DATE
            </div>
            <div>
              <Datetime
                value={false}
                dateFormat="DD-MM-YYYY"
                timeFormat={false}
                onChange={handleDateChange}
                inputProps={{ readOnly: true, className: 'custom-input' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};