import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import FilmModale from "./FilmModale";

const CardProgrammazione = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Row className="cardProgrammazione d-flex justify-content-center py-2">
        <Col>
          <img
            style={{ height: "200px" }}
            src={props.spettacolo.film.immagine}
            alt="film"
          />
        </Col>
        <Col className="d-flex flex-column justify-content-center align-items-start my-1">
          <h4>
            <strong>{props.spettacolo.film.titolo}</strong>
          </h4>
          <h6 className="mb-3">
            <strong>Data uscita: </strong> {props.spettacolo.film.datauscita}
          </h6>

          <Button variant="primary" onClick={() => setModalShow(true)}>
            Scheda del film
          </Button>
          <FilmModale
            key={props.spettacolo.id}
            show={modalShow}
            onHide={() => setModalShow(false)}
            id={props.spettacolo.film.id}
          />
        </Col>

        <Col className="d-flex flex-column justify-content-center">
          <h4>
            <strong>Sala: </strong> {props.spettacolo.sala.nome}
          </h4>{" "}
          <h4>
            <strong>Capienza: </strong> {props.spettacolo.sala.posti}
          </h4>{" "}
          <strong className="text-start fs-3 text-primary">
            {props.spettacolo.data}{" "}
          </strong>
          <h3>
            {props.spettacolo.sala.tipo === "IMAX" && (
              <span className="badge text-bg-danger">
                {props.spettacolo.sala.tipo}
              </span>
            )}
          </h3>
        </Col>
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <Button variant="outline-secondary rounded-pill mb-2">
            <strong>{props.spettacolo.orario1}</strong>
          </Button>
          <Button variant="outline-secondary rounded-pill mb-2">
            <strong>{props.spettacolo.orario2}</strong>
          </Button>
          <Button variant="outline-secondary rounded-pill mb-2">
            <strong>{props.spettacolo.orario3}</strong>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CardProgrammazione;
