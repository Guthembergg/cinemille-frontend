import React, { useState } from "react";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
import { utils } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

function ModaleAggiungiFilm(props) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Error while trying to post the film");

  const [show, setShow] = useState(false);

  const myProfile = useSelector((state) => state.myProfile);

  const handleChange = (property, value) => {
    setInfo({ ...info, [property]: value });
  };

  const handleClose = () => {
    setShow(false);

    setErrorTitle(false);
  };
  const handleShow = () => setShow(true);
  let zeroD = "0";
  let zeroM = "0";

  const PostFetch = async () => {
    setLoading(true);
    try {
      if (selectedDay.month > 9) {
        zeroD = "";
      }
      if (selectedDay.day > 9) {
        zeroD = "";
      }
      const response = await fetch(`http://localhost:8080/film`, {
        method: "POST",
        body: JSON.stringify({
          titolo: info.titolo,
          immagine: info.immagine,
          datauscita: `${selectedDay.year}-${zeroM}${selectedDay.month}-${zeroD}${selectedDay.day}`,
        }),
        headers: {
          Authorization: `Bearer ${myProfile?.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setError(false);
        setLoading(false);
        window.location.reload(false);
      } else {
        setError(true);
        setLoading(false);
        setMessage("error ");
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      setMessage("error " + err);
    }
  };
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorImmagine, setErrorImmagine] = useState(false);
  const handleSubmit = (e) => {
    if (!info.titolo) {
      setErrorTitle(true);
    }

    if (!info.immagine) {
      setErrorImmagine(true);
    }

    if (info.immagine && info.titolo) {
      e.preventDefault();
      PostFetch();
    }
  };
  const defaultValue = {
    year: utils().getToday().year,
    month: utils().getToday().month,
    day: utils().getToday().day,
  };
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [info, setInfo] = useState({});

  return (
    <>
      <Button
        className="Btn "
        style={{ cursor: "pointer" }}
        onClick={() => {
          handleShow();
        }}
      >
        Aggiungi film
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto purple">Aggiungi un film</Modal.Title>
        </Modal.Header>

        <Modal.Body className="position-relative ">
          {!error && loading && (
            <div className="d-flex justify-content-center mt-2 mb-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <div className="d-flex justify-content-around align-items-center">
            <Form.Text className="fs-4">Seleziona data uscita</Form.Text>
            <DatePicker
              value={selectedDay}
              onChange={setSelectedDay}
              inputPlaceholder="Select a day"
              shouldHighlightWeekends
              maximumDate={utils().getToday()}
            />
          </div>
          <Form onSubmit={handleSubmit} onKeyDown={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-center">
              <Form.Text className="fs-3 purple">Titolo</Form.Text>
            </div>
            <Form.Control
              as="textarea"
              placeholder="Scrivi un titolo"
              value={info?.titolo}
              onChange={(e) => handleChange("titolo", e.target.value)}
            />{" "}
            {errorTitle && (
              <div className="d-flex justify-content-center">
                {" "}
                <Alert
                  className=" pb-3 text-danger w-100 mt-3"
                  key="danger"
                  variant="danger"
                >
                  Inserisci un titolo
                </Alert>
              </div>
            )}
            <div className="d-flex justify-content-center">
              <Form.Text className="fs-3 purple">Immagine</Form.Text>
            </div>
            <Form.Control
              as="textarea"
              placeholder="Inserisci URL immagine"
              value={info?.immagine}
              onChange={(e) => handleChange("immagine", e.target.value)}
            />{" "}
            {errorImmagine && (
              <div className="d-flex justify-content-center">
                {" "}
                <Alert
                  className=" pb-3 text-danger w-100 mt-3"
                  key="danger"
                  variant="danger"
                >
                  Inserisci un immagine
                </Alert>
              </div>
            )}
            <Modal.Footer>
              <Button
                className="buttonModalSubmit"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModaleAggiungiFilm;
