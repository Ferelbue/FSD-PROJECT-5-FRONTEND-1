import React, { useState, useEffect } from "react";
import './Services.css';
import { Header } from "../../common/Header/Header";
import { GetServices } from "../../services/apiCalls";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
// import imageBack from ""

export const Services = () => {

  const [servicesData, setServicesData] = useState();
  const [error, setError] = useState();

  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
  
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
              <div className="d-flex justify-content-around responsive">
                {block.map((service, serviceIndex) => (
                  <Card key={serviceIndex} className="cardAllService">
                    <Card.Img className="imageServiceCard" src={service.image} />
                    <Card.Body>
                      <Card.Title>{service.serviceName.toUpperCase()}</Card.Title>
                      <Card.Text>{service.description}</Card.Text>
                    </Card.Body>
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