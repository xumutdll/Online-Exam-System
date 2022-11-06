import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./css/ModalContainer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export const ModalContainer = ({ content }) => {
  const [open, setOpen] = useState(false);
  console.log();
  return (
    <div className="modal-button">
      <button onClick={() => setOpen(true)}>
        {content.type.name === "FormCreateExam" && !content.props.theExam ? (
          "Create a new exam"
        ) : content.type.name === "FormCreateQuestion" &&
          !content.props.theQuestion ? (
          "Create a new question"
        ) : (
          <FontAwesomeIcon icon={faPen} />
        )}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} center>
        {content}
      </Modal>
    </div>
  );
};
