import React, { useEffect, useState } from "react";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
import { utils } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
function ModaleAggiungiProgrammazione(props) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Error while trying to post the film");
  const [film, setFilm] = useState([]);
  const [sala, setSala] = useState([]);
  const [show, setShow] = useState(false);
  const [filmSelect, setFilmSelect] = useState("");
  const [salaSelect, setSalaSelect] = useState("");
  const myProfile = useSelector((state) => state.myProfile);
  const [orario, onChange] = useState("10:00");

  const handleChange = (property, value) => {
    setInfo({ ...info, [property]: value });
  };

  const handleClose = () => {
    setShow(false);
    setErroFilm(false);
    setErroSala(false);
    setErroOrario(false);
    setErrorDay(false);
    setError(false);
  };
  const handleShow = () => setShow(true);

  const GetFilm = async () => {
    let zeroD = "0";
    let zeroM = "0";
    if (selectedDay.month > 9) {
      zeroM = "";
    }
    if (selectedDay.day > 9) {
      zeroD = "";
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/film/disponibile/${selectedDay.year}-${zeroM}${selectedDay.month}-${zeroD}${selectedDay.day}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${myProfile?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setError(false);
        setLoading(false);
        const data = await response.json();
        console.log(data);
        setFilm(data);
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

  const GetSala = async () => {
    let zeroD = "0";
    let zeroM = "0";
    if (selectedDay.month > 9) {
      zeroM = "";
    }
    if (selectedDay.day > 9) {
      zeroD = "";
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/sala/data/${selectedDay.year}-${zeroM}${selectedDay.month}-${zeroD}${selectedDay.day}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${myProfile?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setError(false);
        setLoading(false);
        const data = await response.json();
        setSala(data);
        console.log(data);
      } else {
        setError(true);
        setLoading(false);
        setMessage("error ");
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      setMessage("error " + err.message);
    }
  };

  const PostFetch = async () => {
    let zeroD = "0";
    let zeroM = "0";
    if (selectedDay.month > 9) {
      zeroM = "";
    }
    if (selectedDay.day > 9) {
      zeroD = "";
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/programmazione/${filmSelect}/${salaSelect}`,
        {
          method: "POST",
          body: JSON.stringify({
            data: `${selectedDay.year}-${zeroM}${selectedDay.month}-${zeroD}${selectedDay.day}`,
            orario1: orario,
          }),
          headers: {
            Authorization: `Bearer ${myProfile?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setError(false);
        setLoading(false);
        window.location.reload(false);
      } else {
        const data = await response.json();
        console.log(data);
        setError(true);
        setLoading(false);
        setMessage(
          "errore data: " +
            data.message +
            " selezionare data compresa tra una settimana e tre dall'uscita del film"
        );
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      setMessage("error " + err);
    }
  };
  const [errorday, setErrorDay] = useState(false);
  const [errorSala, setErroSala] = useState(false);
  const [errorFilm, setErroFilm] = useState(false);
  const [errorOrario, setErroOrario] = useState(false);

  const handleSubmit = (e) => {
    if (!selectedDay) {
      setErrorDay(true);
    } else {
      setErrorDay(false);
    }
    if (!orario) {
      setErroOrario(true);
    } else {
      setErroOrario(false);
    }
    if (!salaSelect) {
      setErroSala(true);
    } else {
      setErroSala(false);
    }
    if (!filmSelect) {
      setErroFilm(true);
    } else {
      setErroFilm(false);
    }
    e.preventDefault();
    if (filmSelect && salaSelect && filmSelect) {
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

  useEffect(() => {
    GetFilm();
  }, [selectedDay]);
  useEffect(() => {
    GetSala();
  }, [selectedDay]);

  return (
    <>
      <Button
        className="Btn "
        style={{ cursor: "pointer" }}
        onClick={() => {
          handleShow();
        }}
      >
        Aggiungi Programmazione
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto purple">
            Aggiungi Programmazione
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="position-relative ">
          <div className="d-flex justify-content-around align-items-center">
            <Form.Text className="fs-4">Seleziona data</Form.Text>
            <DatePicker
              value={selectedDay}
              onChange={(e) => {
                setSelectedDay(e);
              }}
              inputPlaceholder="Select a day"
              shouldHighlightWeekends
              minimumDate={utils().getToday()}
            />
          </div>{" "}
          {errorday && (
            <div className="d-flex justify-content-center">
              {" "}
              <Alert
                className=" pb-3 text-danger w-100 mt-3"
                key="danger"
                variant="danger"
              >
                seleziona data
              </Alert>
            </div>
          )}
          <Form onSubmit={handleSubmit} onKeyDown={(e) => e.stopPropagation()}>
            {error && (
              <div className="d-flex justify-content-center">
                {" "}
                <Alert
                  className=" pb-3 text-danger w-100 mt-3"
                  key="danger"
                  variant="danger"
                >
                  {message}
                </Alert>
              </div>
            )}
            <div className="d-flex justify-content-center">
              <Form.Text className="fs-3 purple mb-2 mt-2">
                Seleziona sala
              </Form.Text>
            </div>
            <div className="d-flex justify-content-center mb-3">
              <select
                value={salaSelect}
                onChange={(e) => {
                  setSalaSelect(e.target.value);
                }}
              >
                {" "}
                <option>seleziona</option>
                {sala?.map((x, y) => (
                  <option value={x.id} key={y}>
                    {x.nome}
                  </option>
                ))}
              </select>
            </div>
            {errorSala && (
              <div className="d-flex justify-content-center">
                {" "}
                <Alert
                  className=" pb-3 text-danger w-100 mt-3"
                  key="danger"
                  variant="danger"
                >
                  seleziona sala
                </Alert>
              </div>
            )}
            <div className="d-flex justify-content-center">
              <Form.Text className="fs-3 purple mb-2">Seleziona film</Form.Text>
            </div>{" "}
            <div className="d-flex justify-content-center">
              <select
                value={filmSelect}
                onChange={(e) => {
                  setFilmSelect(e.target.value);
                }}
              >
                <option>seleziona</option>
                {film?.map((x, y) => (
                  <option value={x.id} key={y}>
                    {x.titolo}
                  </option>
                ))}
              </select>
            </div>{" "}
            {errorFilm && (
              <div className="d-flex justify-content-center">
                {" "}
                <Alert
                  className=" pb-3 text-danger w-100 mt-3"
                  key="danger"
                  variant="danger"
                >
                  seleziona film
                </Alert>
              </div>
            )}
            <div className="d-flex justify-content-center">
              <Form.Text className="fs-3 purple mt-3">
                Seleziona orario
              </Form.Text>
            </div>
            <div className="d-flex justify-content-center mb-5 mt-2">
              <TimePicker onChange={onChange} value={orario} />
            </div>{" "}
            {errorOrario && (
              <div className="d-flex justify-content-center">
                {" "}
                <Alert
                  className=" pb-3 text-danger w-100 mt-3"
                  key="danger"
                  variant="danger"
                >
                  seleziona orario
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

export default ModaleAggiungiProgrammazione;
