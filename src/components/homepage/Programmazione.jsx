import { useEffect, useState } from "react";
import CardProgrammazione from "./CardProgrammazione";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { Input, useInput } from "@nextui-org/react";
import { useSelector } from "react-redux";
import ModaleAggiungiProgrammazione from "./ModaleProgrammazioniAggiunta";
import CsvProgramma from "./CsvProgrammazioniButton";

const Programmazione = () => {
  const roles = useSelector((state) => state?.myProfile?.roles);
  const [programmazione, setProgrammazione] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { reset } = useInput("");

  const [filter, setFilter] = useState("");
  const getProgrammazione = async () => {
    try {
      const response = await fetch(`http://localhost:8080/programmazione`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProgrammazione(data);
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
    getProgrammazione();
  }, []);

  return (
    <>
      <div className="  ">
        <div className="d-flex justify-content-start mt-3 mb-3 ms-5">
          <Input
            shadow={false}
            onClearClick={reset}
            labelPlaceholder="Cerca titolo, sala o data "
            status="primary"
            type="text"
            id=""
            className=" "
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            clearable
          />
          {roles?.some((e) => {
            if (e.id === 1) {
              return true;
            } else {
              return false;
            }
          }) && (
            <div className="ms-5 d-flex ">
              <ModaleAggiungiProgrammazione />

              <CsvProgramma />
            </div>
          )}
        </div>
        {isLoading && <Spinner animation="border" variant="secondary" />}
        {isError && (
          <Alert variant="danger">Errore nel caricamento della pagina</Alert>
        )}
        <Row xs={1} xl={2} className="m-0">
          {programmazione &&
            programmazione
              .filter(
                (e) =>
                  e.film?.titolo
                    ?.toLowerCase()
                    .includes(filter.toLowerCase()) ||
                  e.data.includes(filter) ||
                  e.sala.nome.toLowerCase().includes(filter.toLowerCase())
              )
              .map((e) => <CardProgrammazione key={e.id} spettacolo={e} />)}
        </Row>
      </div>
    </>
  );
};

export default Programmazione;
