import React from "react";

const FieldRenderer = ({ field, disabled, value, onChange }) => {
  const { type, placeholder, options, id } = field;

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(id, e.target.value);
    }
  };

  const handleCheckboxChange = (optionValue, checked) => {
    if (onChange) {
      const currentValues = Array.isArray(value) ? value : [];
      let newValues;

      if (checked) {
        newValues = [...currentValues, optionValue];
      } else {
        newValues = currentValues.filter((v) => v !== optionValue);
      }

      onChange(id, newValues);
    }
  };

  switch (type) {
    case "text":
    case "email":
    case "number":
      return (
        <input
          type={type}
          placeholder={placeholder}
          value={value || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={disabled}
        />
      );

    case "textarea":
      return (
        <textarea
          placeholder={placeholder}
          value={value || ""}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={disabled}
        />
      );

    case "select":
      return (
        <select
          value={value || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={disabled}
        >
          <option value="">Select an option</option>
          {options?.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      );

    case "radio":
      return (
        <div className="space-y-2">
          {options?.map((option, i) => (
            <label key={i} className="flex items-center">
              <input
                type="radio"
                name={id}
                value={option}
                checked={value === option}
                onChange={handleInputChange}
                className="mr-2"
                disabled={disabled}
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      );

    case "checkbox":
      return (
        <div className="space-y-2">
          {options?.map((option, i) => (
            <label key={i} className="flex items-center">
              <input
                type="checkbox"
                checked={Array.isArray(value) ? value.includes(option) : false}
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                className="mr-2"
                disabled={disabled}
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      );

    case "date":
    case "time":
    case "url":
    case "tel":
      return (
        <input
          type={type}
          placeholder={placeholder}
          value={value || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={disabled}
        />
      );

    case "full_name":
    case "job_title":
    case "department":
    case "location":
    case "landline":
    case "mobile":
    case "email_info":
      return (
        <input
          type="text"
          value={field.value || field.placeholder || ""}
          disabled
          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700"
        />
      );

    default:
      return null;
  }
};

export default FieldRenderer;
