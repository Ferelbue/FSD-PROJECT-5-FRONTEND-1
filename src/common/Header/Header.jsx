import { CustomLink } from "../CustomLink/CustomLink";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Header.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export const Header = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('passport')));
  const roleName = token && token.decodificado ? token.decodificado.roleName : null;
  const userName = token && token.decodificado ? token.decodificado.userName : null;
  const navigate = useNavigate();

  useEffect(() => {
    const updatedToken = JSON.parse(localStorage.getItem('passport'));
    setToken(updatedToken);
  }, [userName]);


  return (
    <>
      {token ?
        (roleName === "user" ?

          <Navbar expand="lg" className="headerDesign bg-body-tertiary" style={{ padding: '0em' }}>
            <Container>
              <Navbar.Brand href="#home">
                <img
                  src="../../../img/logo2.png"
                  width="60"
                  height="60"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                  onClick={() => navigate("/")}
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto" >
                  <Nav.Link href="#link"><CustomLink title="SERVICES" destination="/services" /></Nav.Link>
                  <Nav.Link href="#link"><CustomLink title="MY APPOINTMENTS" destination="/appointments" /></Nav.Link>
                  <Nav.Link href="#link"><CustomLink title={`${userName?.toUpperCase()}`} destination="/profile" /></Nav.Link>
                  <Nav.Link href="#link"><CustomLink title="LOG-OUT" destination="/logout" /></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          : (roleName === "admin" ?
            //ADMIN
            <Navbar expand="lg" className="headerDesign bg-body-tertiary" style={{ padding: '0em' }}>
              <Container>
                <Navbar.Brand href="#home">
                  <img
                    src="../../../img/logo2.png"
                    width="60"
                    height="60"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    onClick={() => navigate("/")}
                  />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto" >
                    <Nav.Link href="#link"><CustomLink title="SERVICES" destination="/servicesAdmin" /></Nav.Link>
                    <Nav.Link href="#link"><CustomLink title="USERS" destination="/users" /></Nav.Link>
                    <Nav.Link href="#link"><CustomLink title="MY APPOINTMENTS" destination="/appointments" /></Nav.Link>
                    <Nav.Link href="#link"><CustomLink title={`${userName?.toUpperCase()}`} destination="/profile" /></Nav.Link>
                    <Nav.Link href="#link"><CustomLink title="LOG-OUT" destination="/logout" /></Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>

            :
            <div className="menu">
              <Navbar expand="lg" className="headerDesign bg-body-tertiary" style={{ padding: '0em' }}>
                <Container>
                  <Navbar.Brand href="#home">
                    <img
                      src="../../../img/logo2.png"
                      width="60"
                      height="60"
                      className="d-inline-block align-top"
                      alt="React Bootstrap logo"
                      onClick={() => navigate("/")}
                    />
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="ms-auto">
                      <Nav.Link href="#link"><CustomLink title="SERVICES" destination="/services" /></Nav.Link>
                      <Nav.Link href="#link"><CustomLink title="LOGIN" destination="/login" /></Nav.Link>
                      <Nav.Link href="#link"><CustomLink title="REGISTER" destination="/register" /></Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </div>)

        ) : (
          <div className="menu">
            <Navbar expand="lg" className="headerDesign bg-body-tertiary" style={{ padding: '0em' }}>
              <Container>
                <Navbar.Brand href="#home">
                  <img
                    src="../../../img/logo2.png"
                    width="60"
                    height="60"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    onClick={() => navigate("/")}
                  />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                  <Nav className="ms-auto">
                    <Nav.Link href="#link"><CustomLink title="SERVICES" destination="/services" /></Nav.Link>
                    <Nav.Link href="#link"><CustomLink title="LOGIN" destination="/login" /></Nav.Link>
                    <Nav.Link href="#link"><CustomLink title="REGISTER" destination="/register" /></Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        )}
    </>
  );
};