import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Trash2, Edit2, Check, Sliders, Edit } from "lucide-react";
import FieldRenderer from "./FieldRenderer";
import "@/css/FormField.css";
import Modal, { useModal } from "@clayui/modal";
import "@clayui/css/lib/css/atlas.css";
import AdvancedFieldSettingsModal from "./AdvancedFieldSettingsModal";

const FormField = ({
  field,
  index,
  pageId,
  editingField,
  setEditingField,
  updateField,
  deleteField,
}) => {
  const { observer, onOpenChange, open } = useModal();

  const handleOptionChange = (optionIndex, newValue) => {
    const newOptions = [...field.options];
    newOptions[optionIndex] = newValue;
    updateField(pageId, field.id, { options: newOptions });
  };

  const handleRemoveOption = (optionIndex) => {
    const newOptions = field.options.filter((_, idx) => idx !== optionIndex);
    updateField(pageId, field.id, { options: newOptions });
  };

  const handleAddOption = () => {
    updateField(pageId, field.id, {
      options: [...(field.options || []), ""],
    });
  };

  return (
    <Draggable draggableId={field.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={
            "form-field " + (editingField === field.id ? "field-editing" : "")
          }
        >
          <div className="flex justify-between gap-2">
            {editingField === field.id ? (
              <input
                value={field.label}
                onChange={(e) =>
                  updateField(pageId, field.id, { label: e.target.value })
                }
                className="field-input"
                autoFocus
              />
            ) : (
              <label className="field-label">
                {field.label}{" "}
                {field.required && <span style={{ color: "red" }}>*</span>}
              </label>
            )}

            <div className="field-actions">
              {editingField === field.id ? (
                <button onClick={() => setEditingField(null)} title="Save">
                  <Check size={16} />
                </button>
              ) : (
                <button onClick={() => setEditingField(field.id)} title="Edit">
                  <Edit size={16} />
                </button>
              )}
              <button
                onClick={() => deleteField(pageId, field.id)}
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {editingField !== field.id && (
            <FieldRenderer field={field} disabled={true} />
          )}

          {field.description && editingField !== field.id && (
            <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
              {field.description}
            </p>
          )}

          {editingField === field.id && (
            <div className="flex flex-col gap-4">
              {["select", "radio", "checkbox"].includes(field.type) && (
                <div className="field-options-editor">
                  <label style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    Liste des options :
                  </label>
                  {field.options?.map((option, i) => (
                    <div key={i} className="field-option-row">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(i, e.target.value)}
                        className="field-input"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(i)}
                        className="remove-option-button"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="add-option-button"
                  >
                    + Ajouter une option
                  </button>
                </div>
              )}

              <input
                type="text"
                placeholder="Description (optionnelle)"
                value={field.description || ""}
                onChange={(e) =>
                  updateField(pageId, field.id, { description: e.target.value })
                }
                className="field-input"
              />
            </div>
          )}

          {editingField === field.id && (
            <div className="flex justify-between items-center">
              <label>
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    updateField(pageId, field.id, {
                      required: e.target.checked,
                    })
                  }
                />
                <span style={{ marginLeft: "6px" }}>Champ obligatoire</span>
              </label>

              {["text", "textarea", "number"].includes(field.type) && (
                <button
                  type="button"
                  onClick={() => onOpenChange(true)}
                  className="w-fit h-8 text-sm bg-transparent border hover:bg-gray-300 rounded-md p-3 flex items-center"
                >
                  <Sliders className="w-4 h-4 mr-2" />
                  Paramètres avancés
                </button>
              )}
            </div>
          )}

          <AdvancedFieldSettingsModal
            observer={observer}
            open={open}
            field={field}
            pageId={pageId}
            updateField={updateField}
          />
        </div>
      )}
    </Draggable>
  );
};

export default FormField;
