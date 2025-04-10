import React from "react";
import ReactDOM from "react-dom";
const ProfileModal = () => {
  return ReactDOM.createPortal(
    <div className="bg-slate">this is my modal</div>,
    document.getElementById("modal-root")
  );
};

export default ProfileModal;
