import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FilmModal(props) {
  const [film, setFilm] = useState();

  const getFilm = async () => {
    try {
      const response = await fetch(`http://localhost:8080/film/${props.id}`);
      if (response.ok) {
        const data = await response.json();
        setFilm(data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFilm();
  }, []);

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="ms-5">Scheda Film </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="cardProgrammazione d-flex justify-content-around py-2">
          <Col>
            <div className="ms-5">
              <img
                style={{ height: "300px" }}
                src={film?.immagine}
                alt="placeholder"
              />
            </div>
          </Col>
          <Col className="d-flex flex-column ">
            <h4>
              <strong>{film?.titolo}</strong>
            </h4>{" "}
            <h4 className="mt-4">{film?.datauscita}</h4>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Chiudi</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FilmModal;
