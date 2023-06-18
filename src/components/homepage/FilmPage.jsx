import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardFilm from "./FilmCard";
import { useSelector } from "react-redux";
import { Button, Input, useInput } from "@nextui-org/react";
import ModaleAggiungiFilm from "./ModaleAggiuntaFilm";
import "./style.scss";
import ModaleCsvFilm from "./CsvFilmButton";
const FilmPage = () => {
  const { reset } = useInput("");
  const [filter, setFilter] = useState("");
  const [film, setFilm] = useState();
  const roles = useSelector((state) => state?.myProfile?.roles);
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
            <Col className="d-flex justify-content-center ">
              <div className="me-5">
                {" "}
                <ModaleAggiungiFilm />
              </div>

              <ModaleCsvFilm />
            </Col>
          </Row>
        )}
        <div className="d-flex justify-content-start">
          <Input
            shadow={false}
            onClearClick={reset}
            labelPlaceholder="Cerca titolo o data "
            status="primary"
            type="text"
            id=""
            className=" "
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            clearable
          />
        </div>
        {film &&
          film
            .filter(
              (e) =>
                e?.titolo?.toLowerCase().includes(filter.toLowerCase()) ||
                e.datauscita.includes(filter)
            )
            .map((e, i) => <CardFilm key={i} film={e} />)}
      </Row>
    </Container>
  );
};

export default FilmPage;
