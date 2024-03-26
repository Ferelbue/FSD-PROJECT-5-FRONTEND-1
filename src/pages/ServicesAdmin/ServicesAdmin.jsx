import React, { useState, useEffect } from "react";
import './ServicesAdmin.css';
import { Header } from "../../common/Header/Header";
import { GetServices, deleteService } from "../../services/apiCalls";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { CustomDelete } from "../../common/CustomDelete/CustomDelete";
import { Link, useNavigate } from "react-router-dom";

export const ServicesAdmin = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
  const [servicesData, setServicesData] = useState();
  const [error, setError] = useState();


  useEffect(() => {
    const fetchServices = async () => {
      try {

        const data = await GetServices();
        setServicesData(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (serviceId) => {
    try {
      await deleteService(serviceId, tokenStorage);

      const updatedServicesData = await GetServices(tokenStorage);
      setServicesData(updatedServicesData);

    } catch (error) {
      setError(error);
    }
  };

  const carouselSize = 3;
  const arrayServices = [];
  if (servicesData && servicesData.data) {
    for (let i = 0; i < servicesData.data.length; i += carouselSize) {
      arrayServices.push(servicesData.data.slice(i, i + carouselSize));
    }
  }


  return (
    <>
      <Header />
      <div className='servicesDesign'>
        <Carousel>
          {arrayServices.map((block, blockIndex) => (
            <Carousel.Item key={blockIndex}>
              <div className="d-flex justify-content-around">
                {block.map((service, serviceIndex) => (
                  <Card key={serviceIndex} className="cardService">
                    <Card.Img className="imageCard" variant="top" src={service.image} />
                    <Card.Body>
                      <Card.Title>{service.serviceName}</Card.Title>
                      <Card.Text>{service.description}</Card.Text>
                    </Card.Body>
                    <div className="cardButtons">
                    <CustomDelete className="linkAdmin" title={`DELETE SERVICE`} onClick={() => handleDelete(service.id)} />
                    <Link to={`/serviceById/${service.id}`} className="linkAdmin">UPDATE SERVICE</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  )
}