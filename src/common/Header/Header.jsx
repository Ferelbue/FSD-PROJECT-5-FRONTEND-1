import { CustomLink } from "../CustomLink/CustomLink";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Header.css";


export const Header = () => {

  const token = JSON.parse(localStorage.getItem("passport"));


  return (
    <div>
      {token ? 
        ( token.decodificado.roleName === "user" ?
   
          <Navbar expand="lg" className="headerDesign bg-body-tertiary" style={{ padding: '0em'}}>
            <Container>
              <Navbar.Brand href="#home" ><CustomLink title="LOGO" destination="/" /></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto" >
                  <Nav.Link href="#link"><CustomLink title="MY APPOINTMENTS" destination="/appointments" /></Nav.Link>
                  <Nav.Link href="#link"><CustomLink title={`${token.decodificado.userName.toUpperCase()}`} destination="/profile" /></Nav.Link>
                  <Nav.Link href="#link"><CustomLink title="LOG-OUT" destination="/logout" /></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

        : ( //ADMIN
        <Navbar expand="lg" className="headerDesign bg-body-tertiary" style={{ padding: '0em'}}>
        <Container>
          <Navbar.Brand href="#home" ><CustomLink title="LOGO" destination="/" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" >
              <Nav.Link href="#link"><CustomLink title="SERVICES" destination="/servicesAdmin" /></Nav.Link>
              <Nav.Link href="#link"><CustomLink title="USERS" destination="/users" /></Nav.Link>
              <Nav.Link href="#link"><CustomLink title="MY APPOINTMENTS" destination="/appointments" /></Nav.Link>
              <Nav.Link href="#link"><CustomLink title={`${token.decodificado.userName.toUpperCase()}`} destination="/profile" /></Nav.Link>
              <Nav.Link href="#link"><CustomLink title="LOG-OUT" destination="/logout" /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> )

      ) : (
        <div className="menu">
          <Navbar expand="lg" className="headerDesign bg-body-tertiary" style={{ padding: '0em'}}>
            <Container>
              <Navbar.Brand href="#home"><CustomLink title="LOGO" destination="/" /></Navbar.Brand>
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
    </div>






  );
};