import { useEffect, useState } from "react";
import CardProgrammazione from "./CardProgrammazione";
import { Alert, Container, Spinner } from "react-bootstrap";
import { Input, useInput } from "@nextui-org/react";

const Programmazione = () => {
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
      <Container className=" flex-wrap py-3 px-1 ">
        <div className="d-flex justify-content-start mt-3 mb-3 ms-3">
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
        </div>
        {isLoading && <Spinner animation="border" variant="secondary" />}
        {isError && (
          <Alert variant="danger">Errore nel caricamento della pagina</Alert>
        )}
        {programmazione &&
          programmazione
            .filter(
              (e) =>
                e.film?.titolo?.toLowerCase().includes(filter.toLowerCase()) ||
                e.data.includes(filter) ||
                e.sala.nome.toLowerCase().includes(filter.toLowerCase())
            )
            .map((e) => <CardProgrammazione key={e.id} spettacolo={e} />)}
      </Container>
    </>
  );
};

export default Programmazione;
