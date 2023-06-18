import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import FilmModale from "./FilmModale";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import CancellaFIlm from "./CancellaFilm";
function CardFilm(props) {
  const [modalShow, setModalShow] = useState(false);
  const roles = useSelector((state) => state.myProfile?.roles);
  return (
    <Card style={{ width: "18rem" }} className="m-3 p-0 position-relative">
      <Card.Img
        style={{ width: "100%" }}
        variant="top"
        src={props?.film?.immagine}
      />
      <Card.Body className="d-flex flex-column justify-content-between ">
        <Card.Title>
          <p className="text-center fw-bold fs-4 mb-3">{props?.film?.titolo}</p>
        </Card.Title>
        <Row className="d-flex justify-content-center">
          <Button
            variant="primary"
            className="mb-1 w-75"
            onClick={() => setModalShow(true)}
          >
            Scheda
          </Button>{" "}
          {roles?.some((e) => {
            if (e.id === 1) {
              return true;
            } else {
              return false;
            }
          }) && (
            <div className="cancella">
              <CancellaFIlm id={props?.film?.id} />
            </div>
          )}
        </Row>
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
