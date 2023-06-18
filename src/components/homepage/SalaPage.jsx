import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardSala from "./CardSala";
import { useSelector } from "react-redux";

const Sale = () => {
  const [sala, setSala] = useState();
  const roles = useSelector((state) => state?.myProfile?.roles);
  const getSala = async () => {
    try {
      const response = await fetch("http://localhost:8080/sala");
      if (response.ok) {
        const data = await response.json();
        setSala(data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSala();
  }, []);
  return (
    <Container>
      <Row className="d-flex justify-content-center p-3">
        {sala && sala.map((e) => <CardSala sala={e} />)}
      </Row>
    </Container>
  );
};

export default Sale;
