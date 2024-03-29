import React, { useState, useEffect } from "react";
import './Users.css';
import { Header } from "../../common/Header/Header";
import { GetUsers, deleteUser } from "../../services/apiCalls";

import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate } from "react-router-dom";
import { CustomDelete } from "../../common/CustomDelete/CustomDelete";
import Spinner from 'react-bootstrap/Spinner';
import { decodeToken } from "react-jwt";
import { CustomInput } from "../../common/CustomInput/CustomInput";

export const Users = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
  const [usersData, setUsersData] = useState();
  const [error, setError] = useState();
  const [loadedData, setLoadedData] = useState(false);

  const decodificado = decodeToken(datosUser.token);

  const passport = {
    token: datosUser.token,
    decodificado: decodificado
  };

  const [filter, setFilter] = useState({
    email: "",
  });

  const inputHandler = (e) => {
    setFilter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  useEffect(() => {
    if (!tokenStorage || (datosUser?.decodificado.roleName !== "admin")) {
      navigate("/");
    }
  }, [tokenStorage]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("hola")
        console.log(tokenStorage)
        console.log(filter.email)
        const data = await GetUsers(tokenStorage, filter.email);
        setUsersData(data);

        setTimeout(() => {
          setLoadedData(true);

        }, 1000);

      } catch (error) {
        setError(error);
      }
    };

    fetchUsers();
  }, [filter]);

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
      <div className='usersDesign'>
        {!loadedData ? (
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <div className="filters">
              <CustomInput
                className={`inputDesign`}
                type={"text"}
                placeholder={"Filter by email..."}
                name={"email"}
                value={filter.email || ""}
                onChangeFunction={(e) => inputHandler(e)}
              />
            </div>
            <div>
              <Carousel className="carousel">
                {arrayUsers.map((block, blockIndex) => (
                  <Carousel.Item key={blockIndex}>
                    <div className="d-flex justify-content-around responsive">
                      {block.map((user, userIndex) => (
                        <Link to={`/profileById/${user.id}`} className="link">
                          <Card key={userIndex} className="cardUser">
                            <Card.Img className="imageCardUser" variant="top" src={user.image} />
                            <Card.Body>
                              <Card.Title className="textCard">{user.firstName}</Card.Title>
                              <Card.Text className="textCard">{user.email}</Card.Text>
                            </Card.Body>
                            <div className="cardButtons">
                              <Link to={`/appointmentsById/${user.id}`} className="linkAdmin">APPOINTMENTS</Link>
                              <CustomDelete title={`DELETE USER`} onClick={() => handleDelete(user.id)} />
                            </div>
                          </Card>
                        </Link>
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
  )
}