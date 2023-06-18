import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import CardSala from "./CardSala";
import { useSelector } from "react-redux";
import CsvSala from "./CsvSala";

const Sale = () => {
  const [sala, setSala] = useState();
  const roles = useSelector((state) => state?.myProfile?.roles);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const getSala = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/sala");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSala(data);
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
    getSala();
  }, []);
  return (
    <Container>
      {" "}
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
              <CsvSala />
            </div>
          </Col>
        </Row>
      )}{" "}
      <Row className="d-flex justify-content-center p-3">
        {" "}
        {isError && (
          <Alert variant="danger">Errore nel caricamento della pagina</Alert>
        )}
        {isLoading && (
          <Spinner animation="border" className="m-auto" variant="secondary" />
        )}
        {sala && sala.map((e, i) => <CardSala key={`sala-${i}`} sala={e} />)}
      </Row>
    </Container>
  );
};

export default Sale;
