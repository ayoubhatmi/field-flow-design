import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

const FormPreview = ({ formTitle, formDescription, pages }) => {
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

  const nextPage = () => {
    if (!isLastPage) {
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
    console.log("Form submitted:", formData);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">{formTitle}</h1>
        <p className="text-purple-600">{formDescription}</p>
      </div>

      <div className="shadow-xl border-0 bg-white">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg py-3 px-4">
          <div className="text-center font-medium">{currentPage.title}</div>
          <div className="text-center text-sm opacity-90">
            {currentPage.description}
          </div>
          <div className="text-center text-sm opacity-75">
            Page {currentPageIndex + 1} of {pages.length}
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {currentPage.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>

                  {[
                    "text",
                    "email",
                    "number",
                    "tel",
                    "url",
                    "date",
                    "time",
                  ].includes(field.type) ? (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ""}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                      required={field.required}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : field.type === "textarea" ? (
                    <textarea
                      placeholder={field.placeholder}
                      rows={4}
                      value={formData[field.id] || ""}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                      required={field.required}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={formData[field.id] || ""}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                      required={field.required}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "radio" ? (
                    <div className="space-y-3">
                      {field.options?.map((option, i) => (
                        <label
                          key={i}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={field.id}
                            value={option}
                            checked={formData[field.id] === option}
                            onChange={(e) =>
                              handleInputChange(field.id, e.target.value)
                            }
                            required={field.required}
                            className="mr-3 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : field.type === "checkbox" ? (
                    <div className="space-y-3">
                      {field.options?.map((option, i) => (
                        <label
                          key={i}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            value={option}
                            checked={
                              formData[field.id]?.includes(option) || false
                            }
                            onChange={(e) => {
                              const currentValues = formData[field.id] || [];
                              if (e.target.checked) {
                                handleInputChange(field.id, [
                                  ...currentValues,
                                  option,
                                ]);
                              } else {
                                handleInputChange(
                                  field.id,
                                  currentValues.filter((v) => v !== option)
                                );
                              }
                            }}
                            className="mr-3 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : field.type === "rating" ? (
                    <div className="flex space-x-1 text-yellow-500 text-xl">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => handleInputChange(field.id, star)}
                          className={
                            star <= (formData[field.id] || 0)
                              ? "text-yellow-500 text-5xl"
                              : "text-gray-300 text-5xl"
                          }
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  ) : [
                      "full_name",
                      "job_title",
                      "department",
                      "location",
                      "landline",
                      "mobile",
                      "email_info",
                    ].includes(field.type) ? (
                    <input
                      type="text"
                      value={field.value || ""}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 bg-gray-100 text-gray-600 rounded-lg"
                    />
                  ) : null}
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginTop: "4px",
                    }}
                  >
                    {field.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              {!isFirstPage ? (
                <button
                  type="button"
                  onClick={prevPage}
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {!isLastPage ? (
                <button
                  type="button"
                  onClick={nextPage}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Form
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="flex space-x-2">
          {pages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentPageIndex
                  ? "bg-purple-600"
                  : index < currentPageIndex
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
