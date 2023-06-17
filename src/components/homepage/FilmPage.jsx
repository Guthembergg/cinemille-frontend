import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardFilm from "./FilmCard";
import { useSelector } from "react-redux";
import { Button } from "@nextui-org/react";
import ModaleAggiungiFilm from "./ModaleAggiuntaFilm";
import "./style.scss";
import ModaleCsvFilm from "./CsvFilmButton";
const FilmPage = () => {
  const [film, setFilm] = useState();
  const roles = useSelector((state) => state.myProfile.roles);
  const getFilm = async () => {
    try {
      const response = await fetch("http://localhost:8080/film");
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
    <Container>
      <Row className="d-flex justify-content-center p-3">
        {roles?.some((e) => {
          if (e.id === 1) {
            return true;
          } else {
            return false;
          }
        }) && (
          <Row>
            {" "}
            <Col className="d-flex justify-content-center ">
              <div className="me-5">
                {" "}
                <ModaleAggiungiFilm />
              </div>

              <ModaleCsvFilm />
            </Col>
          </Row>
        )}
        {film && film.map((e, i) => <CardFilm key={i} film={e} />)}
      </Row>
    </Container>
  );
};

export default FilmPage;
