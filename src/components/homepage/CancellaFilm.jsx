import React, { useState } from "react";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Fill } from "react-icons/ri";

function CancellaFIlm(props) {
  const [show, setShow] = useState(false);
  const myProfile = useSelector((state) => state.myProfile);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Error while trying to delete the dream"
  );
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const DeleteFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/film/${props.id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${myProfile.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setLoading(false);
        setError(false);
        window.location.reload(false);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  const handleClick = () => {
    DeleteFetch();
  };

  console.log();

  return (
    <>
      <Button
        className="Btn deleteBtn btn-danger"
        style={{ cursor: "pointer" }}
        onClick={() => {
          handleShow();
        }}
      >
        <RiDeleteBin6Fill />
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="text-center purple">
            Vuoi cancellare questo film?
          </Modal.Title>
        </Modal.Header>{" "}
        <Modal.Body>
          {!error && loading && (
            <div className="d-flex justify-content-center mt-2 mb-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <p>la cancellazione è permanente</p>{" "}
          {!error && loading && (
            <div className="d-flex justify-content-center mt-2 mb-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            type="submit"
            onClick={() => {
              handleClose();
              handleClick();
            }}
          >
            Cancella
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CancellaFIlm;
