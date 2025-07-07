import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Plus, Trash2, Copy, ArrowUp, ArrowDown } from "lucide-react";
import FormField from "./FormField";
import "@/css/FormPage.css";

const FormPage = ({
  page,
  index,
  pages,
  editingPageTitle,
  setEditingPageTitle,
  editingPageDescription,
  setEditingPageDescription,
  updatePageTitle,
  updatePageDescription,
  duplicatePage,
  movePageUp,
  movePageDown,
  addPage,
  deletePage,
  editingField,
  setEditingField,
  deleteField,
  updateField,
}) => (
  <div className="form-page-container">
    <div className="form-page-content">
      <div className="form-page-header">
        {editingPageTitle === page.id ? (
          <input
            value={page.title}
            onChange={(e) => updatePageTitle(page.id, e.target.value)}
            onBlur={() => setEditingPageTitle(null)}
            onKeyDown={(e) => e.key === "Enter" && setEditingPageTitle(null)}
            className="page-title-input"
            autoFocus
          />
        ) : (
          <h2
            className="page-title-display"
            onClick={() => setEditingPageTitle(page.id)}
          >
            {page.title || "Page sans titre"}
            <span className="page-badge">Page {index + 1}</span>
          </h2>
        )}

        <div className="page-controls">
          <button
            onClick={() => duplicatePage(page.id)}
            className="page-button"
            title="Duplicate page"
          >
            <Copy className="icon-btn" />
          </button>
          <button
            onClick={() => movePageUp(page.id)}
            disabled={index === 0}
            className="page-button"
            title="Move page up"
          >
            <ArrowUp className="icon-btn" />
          </button>
          <button
            onClick={() => movePageDown(page.id)}
            disabled={index === pages.length - 1}
            className="page-button"
            title="Move page down"
          >
            <ArrowDown className="icon-btn" />
          </button>
          <button
            onClick={addPage}
            className="page-button"
            title="Add new page"
          >
            <Plus className="icon-btn" />
          </button>
          {pages.length > 1 && (
            <button
              onClick={() => deletePage(page.id)}
              className="page-button delete"
              title="Delete page"
            >
              <Trash2 className="icon-btn" />
            </button>
          )}
        </div>
      </div>

      {editingPageDescription === page.id ? (
        <input
          value={page.description}
          onChange={(e) => updatePageDescription(page.id, e.target.value)}
          onBlur={() => setEditingPageDescription(null)}
          onKeyDown={(e) =>
            e.key === "Enter" && setEditingPageDescription(null)
          }
          className="page-description-input"
          autoFocus
        />
      ) : (
        <p
          className="page-description-display"
          onClick={() => setEditingPageDescription(page.id)}
        >
          {page.description || "Description de la page (optionnelle)"}
        </p>
      )}
    </div>

    <Droppable droppableId={page.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`droppable-area ${
            snapshot.isDraggingOver ? "dragging-over" : "not-dragging"
          }`}
        >
          {page.fields.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-title">
                Déposez les champs du formulaire ici
              </p>
              <p className="empty-state-subtitle">
                Faites glisser des éléments depuis la barre latérale pour
                construire votre formulaire
              </p>
            </div>
          ) : (
            page.fields.map((field, i) => (
              <FormField
                key={field.id}
                field={field}
                index={i}
                pageId={page.id}
                editingField={editingField}
                setEditingField={setEditingField}
                deleteField={deleteField}
                updateField={updateField}
              />
            ))
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default FormPage;
