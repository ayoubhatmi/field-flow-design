import React, { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import FormHeader from "./FormHeader";
import FormPage from "./FormPage";
import FormFieldsSidebar from "./FormFieldsSidebar";
import FormPreview from "./FormPreview";
import {
  STATIC_PREFILLED_VALUES,
  DEFAULT_PREFILLED_LABELS,
  PREFILLED_FIELD_TYPES,
  PLACEHOLDER_MAP,
} from "@/constants";
import "@/css/FormBuilder.css";
import { Save, Upload } from "lucide-react";

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState("Formulaire sans titre ");
  const [formDescription, setFormDescription] = useState(
    "Description du formulaire (facultative)"
  );
  const [editingFormTitle, setEditingFormTitle] = useState(false);
  const [editingFormDescription, setEditingFormDescription] = useState(false);
  const [pages, setPages] = useState([
    {
      id: "page-1",
      title: "Page sans titre",
      description: "Decsription (facultative)",
      fields: [],
    },
  ]);

  const [previewMode, setPreviewMode] = useState(false);
  const [editingPageTitle, setEditingPageTitle] = useState(null);
  const [editingPageDescription, setEditingPageDescription] = useState(null);
  const [editingField, setEditingField] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (
      source.droppableId === "sidebar" &&
      destination.droppableId.startsWith("page-")
    ) {
      const pageId = destination.droppableId;
      const fieldType = draggableId;

      const newField = {
        id: `field-${Date.now()}`,
        type: fieldType,
        label: DEFAULT_PREFILLED_LABELS[fieldType] || "Question",
        required: false,
        description: PREFILLED_FIELD_TYPES.has(fieldType)
          ? "Ce champ est rempli automatiquement."
          : "",
        value: STATIC_PREFILLED_VALUES[fieldType] || "",
        placeholder: PLACEHOLDER_MAP[fieldType] || "Tapez votre réponse ici..",
        options: ["select", "radio", "checkbox"].includes(fieldType)
          ? ["Option 1", "Option 2"]
          : undefined,
      };

      setPages((prev) =>
        prev.map((page) =>
          page.id === pageId
            ? { ...page, fields: [...page.fields, newField] }
            : page
        )
      );
    }

    if (
      source.droppableId.startsWith("page-") &&
      destination.droppableId.startsWith("page-")
    ) {
      const sourcePageId = source.droppableId;
      const destPageId = destination.droppableId;

      setPages((prev) => {
        const newPages = [...prev];
        const sourceIndex = newPages.findIndex((p) => p.id === sourcePageId);
        const destIndex = newPages.findIndex((p) => p.id === destPageId);

        const [moved] = newPages[sourceIndex].fields.splice(source.index, 1);
        newPages[destIndex].fields.splice(destination.index, 0, moved);

        return newPages;
      });
    }
  };

  const addPage = () => {
    const newPage = {
      id: `page-${Date.now()}`,
      title: "Page sans titre",
      description: "Decsription (facultative)",
      fields: [],
    };
    setPages((prev) => [...prev, newPage]);
  };

  const deletePage = (pageId) => {
    if (pages.length === 1) return;
    setPages((prev) => prev.filter((p) => p.id !== pageId));
  };

  const duplicatePage = (pageId) => {
    const index = pages.findIndex((p) => p.id === pageId);
    const page = pages[index];
    const duplicate = {
      ...page,
      id: `page-${Date.now()}`,
      title: `${page.title} Copie`,
      fields: page.fields.map((f) => ({
        ...f,
        id: `field-${Date.now()}-${Math.random()}`,
      })),
    };
    const newPages = [...pages];
    newPages.splice(index + 1, 0, duplicate);
    setPages(newPages);
  };

  const movePageUp = (pageId) => {
    const index = pages.findIndex((p) => p.id === pageId);
    if (index > 0) {
      const newPages = [...pages];
      [newPages[index - 1], newPages[index]] = [
        newPages[index],
        newPages[index - 1],
      ];
      setPages(newPages);
    }
  };

  const movePageDown = (pageId) => {
    const index = pages.findIndex((p) => p.id === pageId);
    if (index < pages.length - 1) {
      const newPages = [...pages];
      [newPages[index], newPages[index + 1]] = [
        newPages[index + 1],
        newPages[index],
      ];
      setPages(newPages);
    }
  };

  const updatePageTitle = (id, title) =>
    setPages((prev) => prev.map((p) => (p.id === id ? { ...p, title } : p)));

  const updatePageDescription = (id, desc) =>
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, description: desc } : p))
    );

  const updateField = useCallback((pageId, fieldId, updates) => {
    setPages((prev) =>
      prev.map((page) =>
        page.id === pageId
          ? {
              ...page,
              fields: page.fields.map((field) =>
                field.id === fieldId ? { ...field, ...updates } : field
              ),
            }
          : page
      )
    );
  }, []);

  const deleteField = (pageId, fieldId) =>
    setPages((prev) =>
      prev.map((p) =>
        p.id === pageId
          ? { ...p, fields: p.fields.filter((f) => f.id !== fieldId) }
          : p
      )
    );

  if (previewMode) {
    return (
      <FormPreview
        formTitle={formTitle}
        formDescription={formDescription}
        pages={pages}
        setPreviewMode={setPreviewMode}
      />
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="form-builder">
        <div className="form-container">
          <FormHeader
            formTitle={formTitle}
            formDescription={formDescription}
            editingFormTitle={editingFormTitle}
            setEditingFormTitle={setEditingFormTitle}
            editingFormDescription={editingFormDescription}
            setEditingFormDescription={setEditingFormDescription}
            setFormTitle={setFormTitle}
            setFormDescription={setFormDescription}
            pages={pages}
          />

          <div className="space-y-6">
            {pages.map((page, index) => (
              <FormPage
                key={page.id}
                page={page}
                index={index}
                pages={pages}
                editingPageTitle={editingPageTitle}
                setEditingPageTitle={setEditingPageTitle}
                editingPageDescription={editingPageDescription}
                setEditingPageDescription={setEditingPageDescription}
                editingField={editingField}
                setEditingField={setEditingField}
                updatePageTitle={updatePageTitle}
                updatePageDescription={updatePageDescription}
                duplicatePage={duplicatePage}
                movePageUp={movePageUp}
                movePageDown={movePageDown}
                addPage={addPage}
                deletePage={deletePage}
                deleteField={deleteField}
                updateField={updateField}
              />
            ))}
          </div>

          <div className="flex justify-end w-full gap-2">
            <button
              onClick={() => {
                console.log("Saved form data:", {
                  title: formTitle,
                  description: formDescription,
                  pages,
                });
                alert("Form saved! Check console for details.");
              }}
              className="border border-purple-600 text-purple-700 hover:bg-purple-50 p-2 rounded-md inline-flex items-center gap-2"
            >
              <Save className="icon-btn" />
              Enregistrer
            </button>
            <button
              onClick={() => {
                console.log("Published form data:", {
                  title: formTitle,
                  description: formDescription,
                  pages,
                });
                alert("Form published! Check console for details.");
              }}
              className="button-custom"
            >
              <Upload className="icon-btn" />
              Publier
            </button>
          </div>
        </div>
        <FormFieldsSidebar />
      </div>
    </DragDropContext>
  );
};

export default FormBuilder;
