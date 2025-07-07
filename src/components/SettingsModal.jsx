import React from "react";
import Modal from "@clayui/modal";
import "@clayui/css/lib/css/atlas.css";

const SettingsModal = ({ observer, open }) => {
  if (!open) return null;

  return (
    <Modal observer={observer} size="lg" status="info">
      <Modal.Header>Paramètres</Modal.Header>
      <Modal.Body>
        <div className="flex gap-2 flex-col"></div>
      </Modal.Body>
    </Modal>
  );
};

export default SettingsModal;
