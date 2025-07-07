import React, { useState } from "react";
import Modal from "@clayui/modal";
import "@clayui/css/lib/css/atlas.css";
import { ChevronLeft, ChevronRight, FileText, Send } from "lucide-react";
import "@/css/FormPreviewModal.css";
import FieldRenderer from "./FieldRenderer";

const FormPreviewModal = ({
  observer,
  open,
  formTitle,
  formDescription,
  pages,
}) => {
  if (!open) return null;

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const currentPage = pages[currentPageIndex];
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === pages.length - 1;

  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const validateCurrentPage = () => {
    const requiredFields = currentPage.fields.filter((field) => field.required);

    for (const field of requiredFields) {
      const value = formData[field.id];

      // Check if field is empty or undefined
      if (!value || (Array.isArray(value) && value.length === 0)) {
        alert(`Please fill in the required field: ${field.label}`);
        return false;
      }
    }

    return true;
  };

  const nextPage = () => {
    if (validateCurrentPage() && !isLastPage) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (!isFirstPage) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateCurrentPage()) {
      return;
    }

    console.log("Form submitted:", formData);

    // Create a more readable format
    const formattedData = {
      formTitle,
      formDescription,
      submissionData: {},
      pages: pages.map((page, pageIndex) => ({
        pageTitle: page.title,
        pageDescription: page.description,
        fields: page.fields.map((field) => ({
          label: field.label,
          type: field.type,
          value: formData[field.id] || null,
          required: field.required,
          placeholder: field.placeholder || "",
          options: field.options || [],
          description: field.description || "",
          id: field.id,
        })),
      })),
    };

    // Also create a simple key-value object for easy access
    pages.forEach((page) => {
      page.fields.forEach((field) => {
        formattedData.submissionData[field.label] = formData[field.id] || null;
      });
    });

    console.log("Formatted submission data:", formattedData);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <Modal observer={observer} size="lg" status="info">
      <Modal.Header>Mode aperçu</Modal.Header>
      <Modal.Body>
        <div className="form-preview-modal">
          <div className="form-header-container">
            <h2 className="form-title">{formTitle}</h2>
            <p className="form-description">{formDescription}</p>
          </div>

          <div className="page-container">
            <div className="page-header-container">
              <h3 className="page-title">{currentPage.title}</h3>
              <p className="page-description">{currentPage.description}</p>
              <div>
                Page {currentPageIndex + 1} of {pages.length}
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="fields-container">
                {currentPage.fields.map((field) => (
                  <div key={field.id}>
                    <label className="field-label">
                      {field.label}
                      {field.required && <span className="required">*</span>}
                    </label>
                    <FieldRenderer
                      field={field}
                      disabled={false}
                      value={formData[field.id]}
                      onChange={handleInputChange}
                    />
                    {field.description && (
                      <p className="field-description">{field.description}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="form-actions">
                {!isFirstPage ? (
                  <button
                    type="button"
                    onClick={prevPage}
                    className="px-4 py-2 border border-purple-300 text-purple-700 hover:bg-purple-50 rounded-md flex items-center"
                  >
                    <ChevronLeft className="icon-btn" />
                    Previous
                  </button>
                ) : (
                  <div></div>
                )}
                {!isLastPage ? (
                  <button
                    type="button"
                    onClick={nextPage}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center"
                  >
                    Next
                    <ChevronRight className="icon-btn" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    // disabled
                    title="Impossible d'envoyer les formulaires en mode aperçu!"
                    className="button-custom"
                  >
                    <Send className="icon-btn" />
                    Submit Form
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FormPreviewModal;
