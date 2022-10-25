import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./css/ModalContainer.css";
export const ModalContainer = ({ content }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div className="modal-button">
      <button onClick={onOpenModal}>
        Create a new{" "}
        {content.type.name === "FormCreateExam"
          ? "exam"
          : content.type.name === "FormCreateQuestion"
          ? "question"
          : ""}
      </button>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="modal-container">{content}</div>
        <div className="submit"></div>
      </Modal>
    </div>
  );
};
