import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import FilmModale from "./FilmModale";
import { Image } from "@nextui-org/react";
import { useSelector } from "react-redux";
import CancellaProgramma from "./CancellaProgrammazione";

const CardProgrammazione = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const roles = useSelector((state) => state?.myProfile?.roles);

  return (
    <>
      <Row className="d-flex justify-content-center py-2 bg-light mb-4 ">
        <div className="d-flex ">
          <div className="d-flex justify-content-center ms-5">
            <Image
              className="cardPImage"
              src={props.spettacolo.film.immagine}
              alt="film"
            />
          </div>
          <Col xs={1} xl={2}></Col>
          <div className="d-flex flex-column  my-1">
            <h4>
              <strong className="">{props.spettacolo.film.titolo} </strong>{" "}
            </h4>{" "}
            <h6 className="mb-3">
              <strong>Data uscita: </strong> {props.spettacolo.film.datauscita}
            </h6>{" "}
            <div className="d-flex">
              <div>
                <Button
                  variant="primary"
                  className="mb-3"
                  onClick={() => setModalShow(true)}
                >
                  Scheda del film
                </Button>{" "}
              </div>
              <div>
                {roles?.some((e) => {
                  if (e.id === 1) {
                    return true;
                  } else {
                    return false;
                  }
                }) && (
                  <div className="ms-5 d-flex ">
                    <CancellaProgramma />
                  </div>
                )}
              </div>
            </div>
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
