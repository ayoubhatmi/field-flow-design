
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import './FormPreview.css';

const FormPreview = ({ pages }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const currentPage = pages[currentPageIndex];
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === pages.length - 1;

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const nextPage = () => {
    if (!isLastPage) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (!isFirstPage) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted successfully! Check console for data.');
  };

  return (
    <div className="form-preview">
      <Card className="preview-card">
        <CardHeader className="preview-header">
          <CardTitle className="preview-title">
            {currentPage.title}
          </CardTitle>
          {currentPage.description && (
            <p className="preview-description">{currentPage.description}</p>
          )}
          <div className="page-indicator">
            Page {currentPageIndex + 1} of {pages.length}
          </div>
        </CardHeader>
        <CardContent className="preview-content">
          <form onSubmit={handleSubmit}>
            <div className="fields-container">
              {currentPage.fields.map((field) => (
                <div key={field.id} className="field-group">
                  <label className="field-label">
                    {field.label}
                    {field.required && <span className="required">*</span>}
                  </label>
                  
                  {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      required={field.required}
                      className="field-input"
                    />
                  ) : field.type === 'textarea' ? (
                    <textarea
                      placeholder={field.placeholder}
                      rows={4}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      required={field.required}
                      className="field-textarea"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      required={field.required}
                      className="field-select"
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === 'radio' ? (
                    <div className="radio-group">
                      {field.options?.map((option, i) => (
                        <label key={i} className="radio-label">
                          <input
                            type="radio"
                            name={field.id}
                            value={option}
                            checked={formData[field.id] === option}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            required={field.required}
                            className="radio-input"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : field.type === 'checkbox' ? (
                    <div className="checkbox-group">
                      {field.options?.map((option, i) => (
                        <label key={i} className="checkbox-label">
                          <input
                            type="checkbox"
                            value={option}
                            checked={formData[field.id]?.includes(option) || false}
                            onChange={(e) => {
                              const currentValues = formData[field.id] || [];
                              if (e.target.checked) {
                                handleInputChange(field.id, [...currentValues, option]);
                              } else {
                                handleInputChange(field.id, currentValues.filter(v => v !== option));
                              }
                            }}
                            className="checkbox-input"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="navigation">
              {!isFirstPage ? (
                <Button 
                  type="button" 
                  onClick={prevPage}
                  variant="outline"
                  className="nav-btn prev-btn"
                >
                  <ChevronLeft className="icon" />
                  Previous
                </Button>
              ) : (
                <div></div>
              )}

              {!isLastPage ? (
                <Button 
                  type="button" 
                  onClick={nextPage}
                  className="nav-btn next-btn"
                >
                  Next
                  <ChevronRight className="icon" />
                </Button>
              ) : (
                <Button 
                  type="submit"
                  className="nav-btn submit-btn"
                >
                  <Send className="icon" />
                  Submit Form
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="progress-indicator">
        <div className="progress-dots">
          {pages.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${
                index === currentPageIndex 
                  ? 'current' 
                  : index < currentPageIndex 
                    ? 'completed' 
                    : 'pending'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
