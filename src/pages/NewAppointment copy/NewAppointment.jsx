import React, { useState, useEffect } from "react";
import './NewAppointment.css';
import { Header } from "../../common/Header/Header";
import Dropdown from 'react-bootstrap/Dropdown';
import { GetServices } from "../../services/apiCalls";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { CustomButton } from "../../common/CustomButton/CustomButton";

export const NewAppointment = () => {

  const [serviceData, setServiceData] = useState();
  const [error, setError] = useState();
  const [date, setSelectedDate] = useState();
  const [selectedService, setSelectedService] = useState();
  const [service, setService] = useState();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await GetServices();
        setServiceData(data);
        console.log(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchServices();
  }, []);

  const handleSelect = (service) => {
    setService(service.serviceName);
    setSelectedService(service);

    console.log('Seleccionaste el servicio:', service.id);
  };


  const handleDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    console.log('Fecha seleccionada en formato YYYY-MM-DD:', formattedDate);
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

          />
          <div>
            <div>
              SELECT A DATE
            </div>
            <div>
              <Datetime
                value={false}
                dateFormat="DD-MM-YYYY"
                className="prueba"
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