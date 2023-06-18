import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const getFilm = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/film");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFilm(data);
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
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
        <div className="d-flex justify-content-start ms-3">
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
        {isError && (
          <Alert variant="danger">Errore nel caricamento della pagina</Alert>
        )}

        {isLoading && (
          <Spinner animation="border" className="m-auto" variant="secondary" />
        )}
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
