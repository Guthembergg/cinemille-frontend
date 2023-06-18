import React, { useState } from "react";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

function CsvProgramma(props) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Error while trying to post the film");

  const [show, setShow] = useState(false);

  const myProfile = useSelector((state) => state.myProfile);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const PostFetch = async (file) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/programmazione/upload`,
        {
          method: "POST",
          body: file,

          headers: {
            Authorization: `Bearer ${myProfile?.accessToken}`,
          },
        }
      );
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

  const [file, setFile] = useState();

  const handleOnChange = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setFile(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    PostFetch(file);
  };
  return (
    <>
      <Button
        className="Btn ms-5"
        style={{ cursor: "pointer" }}
        onClick={() => {
          handleShow();
        }}
      >
        Aggiungi programmazione tramite csv
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto purple">
            Aggiungi programmazione tramite csv
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="position-relative ">
          {!error && loading && (
            <div className="d-flex justify-content-center mt-2 mb-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <form encType="multipart/form-data" method="post">
            <input
              name="file"
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={handleOnChange}
            />

            <Modal.Footer>
              <Button
                className="buttonModalSubmit"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Importa
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CsvProgramma;
