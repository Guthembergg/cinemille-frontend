import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import cinema from "../../assets/cinema.avif";
function CardSala(props) {
  return (
    <Card style={{ width: "18rem" }} className="m-3 p-0">
      <Card.Img style={{ height: "220px" }} variant="top" src={cinema} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>
          <strong className="fs-4 m-2">
            {props.sala.nome} {"  "}
            {props.sala.tipo === "IMAX" && (
              <span class="badge text-bg-danger"> {props.sala.tipo}</span>
            )}
          </strong>
        </Card.Title>
        <Button variant="secondary rounded-pill mt-2">
          Capienza: <strong>{props.sala.posti}</strong>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardSala;
