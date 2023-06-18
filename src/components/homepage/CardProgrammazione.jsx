import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import FilmModale from "./FilmModale";
import { Image } from "@nextui-org/react";

const CardProgrammazione = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Row className="d-flex justify-content-center py-2 bg-light mb-4 ">
        <div className="d-flex">
          <Col xs={4}>
            <Image
              style={{ height: "400px", width: "300px" }}
              src={props.spettacolo.film.immagine}
              alt="film"
            />
          </Col>
          <Col xs={2}></Col>
          <div className="d-flex flex-column align-items-start my-1">
            <h4>
              <strong>{props.spettacolo.film.titolo}</strong>
            </h4>
            <h6 className="mb-3">
              <strong>Data uscita: </strong> {props.spettacolo.film.datauscita}
            </h6>{" "}
            <Button
              variant="primary"
              className="mb-3"
              onClick={() => setModalShow(true)}
            >
              Scheda del film
            </Button>
            <h4>
              <strong>Sala: </strong> {props.spettacolo.sala.nome}
            </h4>{" "}
            <h4>
              <strong>Capienza: </strong> {props.spettacolo.sala.posti}
            </h4>{" "}
            <h3>
              {props.spettacolo.sala.tipo === "IMAX" && (
                <span className="badge text-bg-danger">
                  {props.spettacolo.sala.tipo}
                </span>
              )}
            </h3>{" "}
            <strong className="text-start fs-2 mt-3 text-primary mb-3 m-auto">
              {props.spettacolo.data}{" "}
            </strong>{" "}
            <div className="m-auto">
              <Button
                className="me-3"
                variant="outline-secondary rounded-pill mb-2"
              >
                <strong>{props.spettacolo.orario1}</strong>
              </Button>
              <Button
                className="me-3"
                variant="outline-secondary rounded-pill mb-2"
              >
                <strong>{props.spettacolo.orario2}</strong>
              </Button>
              <Button variant="outline-secondary rounded-pill mb-2">
                <strong>{props.spettacolo.orario3}</strong>
              </Button>
            </div>
            <FilmModale
              key={props.spettacolo.id}
              show={modalShow}
              onHide={() => setModalShow(false)}
              id={props.spettacolo.film.id}
            />
          </div>{" "}
        </div>
      </Row>
    </>
  );
};

export default CardProgrammazione;
