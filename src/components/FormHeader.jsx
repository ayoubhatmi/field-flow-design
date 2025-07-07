import React from "react";
import { Eye, Plus, Edit2, Settings } from "lucide-react";
import "@/css/FormHeader.css";
import FormPreviewModal from "./FormPreviewModal";
import { useModal } from "@clayui/modal";
import SettingsModal from "./SettingsModal";

const FormHeader = ({
  formTitle,
  formDescription,
  editingFormTitle,
  setEditingFormTitle,
  editingFormDescription,
  setEditingFormDescription,
  setFormTitle,
  setFormDescription,
  pages,
}) => {
  const {
    observer: settingsModalObserver,
    onOpenChange: settingsModalOnOpenChange,
    open: settingsModalOpen,
  } = useModal();

  const {
    observer: formPreviewModalObserver,
    onOpenChange: formPreviewModalOnOpenChange,
    open: formPreviewModalOpen,
  } = useModal();

  return (
    <div className="flex flex-col gap-4">
      <div className="card-header-container">
        <h2 className="header">
          <span className="purple-bar"> </span> Création d'un formulaire
        </h2>
        <div className="flex gap-4">
          <button
            className="button-custom"
            onClick={() => settingsModalOnOpenChange(true)}
          >
            <Settings className="icon-btn" /> Configuration
          </button>
          <button
            className="button-custom"
            onClick={() => formPreviewModalOnOpenChange(true)}
          >
            <Eye className="icon-btn" /> Aperçu
          </button>
        </div>
      </div>

      <div className="form-header-container">
        {editingFormTitle ? (
          <input
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            onBlur={() => setEditingFormTitle(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingFormTitle(false)}
            className="form-header-input"
            autoFocus
          />
        ) : (
          <h1
            className="form-header-display"
            onClick={() => setEditingFormTitle(true)}
          >
            {formTitle}
          </h1>
        )}

        {editingFormDescription ? (
          <input
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            onBlur={() => setEditingFormDescription(false)}
            className="form-description-input"
            autoFocus
          />
        ) : (
          <p
            className="form-description-display"
            onClick={() => setEditingFormDescription(true)}
          >
            {formDescription}
          </p>
        )}
      </div>
      <FormPreviewModal
        observer={formPreviewModalObserver}
        open={formPreviewModalOpen}
        pages={pages}
        formTitle={formTitle}
        formDescription={formDescription}
      />

      <SettingsModal
        observer={settingsModalObserver}
        open={settingsModalOpen}
        pages={pages}
    
      />
    </div>
  );
};

export default FormHeader;
