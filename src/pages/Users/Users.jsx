import React, { useState, useEffect } from "react";
import './Users.css';
import { Header } from "../../common/Header/Header";
import { GetServices, GetUsers, deleteUser } from "../../services/apiCalls";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate } from "react-router-dom";
import { CustomDelete } from "../../common/CustomDelete/CustomDelete";
import Spinner from 'react-bootstrap/Spinner';

export const Users = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
  const [usersData, setUsersData] = useState();
  const [error, setError] = useState();
  const [loadedData, setLoadedData] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log(tokenStorage)
        const data = await GetUsers(tokenStorage);
        setUsersData(data);

        setTimeout(() => {
          setLoadedData(true);

        }, 1000);

      } catch (error) {
        setError(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage]);


  const carouselSize = 4;
  const arrayUsers = [];
  if (usersData && usersData.data) {
    for (let i = 0; i < usersData.data.length; i += carouselSize) {
      arrayUsers.push(usersData.data.slice(i, i + carouselSize));
    }
  }

  const handleDelete = async (userId) => {
    try {

      await deleteUser(userId, tokenStorage);

      const updatedUsersData = await GetUsers(tokenStorage);
      setUsersData(updatedUsersData);
      
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <Header />
      <div className='servicesDesign'>
      {!loadedData ? (
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
        <Carousel className="carousel">
          {arrayUsers.map((block, blockIndex) => (
            <Carousel.Item key={blockIndex}>
              <div className="d-flex justify-content-around">
                {block.map((user, userIndex) => (
                  <Link to={`/profileById/${user.id}`} className="link">
                  <Card key={userIndex} className="cardUser">
                    <Card.Img className="imageCard" variant="top" src={user.image} />
                    <Card.Body>
                      <Card.Title className="textCard">{user.firstName}</Card.Title>
                      <Card.Text className="textCard">{user.email}</Card.Text>
                    </Card.Body>
                    <Link to={`/appointmentsById/${user.id}`} className="linkAppointments">APPOINTMENTS</Link>
                    <CustomDelete title={`DELETE USER`} onClick={() => handleDelete(user.id)} />
                  </Card>
                  </Link>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        </>
        )}
      </div>
    </>
  )
}