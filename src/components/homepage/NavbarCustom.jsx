import { Col, Image, ToggleButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";

function NavbarCustom() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.myProfile.username);
  const roles = useSelector((state) => state.myProfile.roles);

  const handleClick = () => {
    dispatch({ type: "ADD_MY_PROFILE", payload: "" });
  };

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3 nav ">
          <Container fluid>
            <Navbar.Brand href="#" className="fw-semibold d-flex">
              <p className="fs-3 ms-4">CineMille</p>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  CineMille
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  activeKey={location.pathname}
                  className=" d-flex justify-content-end me-5 align-items-center containerNavLink flex-grow-1 pe-3"
                >
                  <Col lg={1} xl={4}></Col>
                  <Nav.Link href="/film" className="fontExpand fs-5 me-4">
                    Film
                  </Nav.Link>
                  <Nav.Link href="/sale" className="fontExpand fs-5 me-4">
                    Sale
                  </Nav.Link>{" "}
                  <Nav.Link
                    href="/programmazioni"
                    className="fontExpand fs-5 me-4"
                  >
                    Programmazioni
                  </Nav.Link>
                  {username ? (
                    <NavDropdown
                      className="fontExpand fs-5 me-4"
                      title={
                        <>
                          Benvenuto,
                          <span className="purple fw-bold ">
                            {" " + username}
                          </span>
                        </>
                      }
                    >
                      {" "}
                      {roles?.some((e) => {
                        if (e.id === 1) {
                          return true;
                        } else {
                          return false;
                        }
                      }) && (
                        <Nav.Link className="text-primary text-center fs-5">
                          Admin
                        </Nav.Link>
                      )}
                      <Nav.Link
                        onClick={handleClick}
                        className="text-danger text-center fs-5"
                      >
                        Log out
                      </Nav.Link>
                    </NavDropdown>
                  ) : (
                    <Nav.Link href="/login" className="fontExpand fs-5 ">
                      Login
                    </Nav.Link>
                  )}
                </Nav>
              </Offcanvas.Body>{" "}
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarCustom;
