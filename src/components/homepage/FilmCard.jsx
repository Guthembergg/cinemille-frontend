import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import FilmModale from "./FilmModale";
function CardFilm(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Card style={{ width: "18rem" }} className="m-3 p-0">
      <Card.Img
        style={{ height: "160px", width: "100%" }}
        variant="top"
        src={props?.film?.immagine}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>
          <p className="text-center fw-bold mb-2">{props?.film?.titolo}</p>
        </Card.Title>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Scheda
        </Button>
        <FilmModale
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={props?.film?.id}
        />
      </Card.Body>
    </Card>
  );
}

export default CardFilm;
