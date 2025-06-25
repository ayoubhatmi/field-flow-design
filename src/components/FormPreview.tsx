
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormPage } from '../types/form';

interface FormPreviewProps {
  formTitle: string;
  formDescription: string;
  pages: FormPage[];
}

const FormPreview: React.FC<FormPreviewProps> = ({ formTitle, formDescription, pages }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const currentPage = pages[currentPageIndex];
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === pages.length - 1;

  const handleInputChange = (fieldId: string, value: any) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted successfully! Check console for data.');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Form Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">{formTitle}</h1>
        <p className="text-purple-600">{formDescription}</p>
      </div>

      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="text-center">
            {currentPage.title}
          </CardTitle>
          <div className="text-center text-sm opacity-90">
            {currentPage.description}
          </div>
          <div className="text-center text-sm opacity-75">
            Page {currentPageIndex + 1} of {pages.length}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {currentPage.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      required={field.required}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  ) : field.type === 'textarea' ? (
                    <textarea
                      placeholder={field.placeholder}
                      rows={4}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      required={field.required}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      required={field.required}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === 'radio' ? (
                    <div className="space-y-3">
                      {field.options?.map((option, i) => (
                        <label key={i} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={field.id}
                            value={option}
                            checked={formData[field.id] === option}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            required={field.required}
                            className="mr-3 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : field.type === 'checkbox' ? (
                    <div className="space-y-3">
                      {field.options?.map((option, i) => (
                        <label key={i} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value={option}
                            checked={formData[field.id]?.includes(option) || false}
                            onChange={(e) => {
                              const currentValues = formData[field.id] || [];
                              if (e.target.checked) {
                                handleInputChange(field.id, [...currentValues, option]);
                              } else {
                                handleInputChange(field.id, currentValues.filter((v: string) => v !== option));
                              }
                            }}
                            className="mr-3 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              {!isFirstPage ? (
                <Button 
                  type="button" 
                  onClick={prevPage}
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              ) : (
                <div></div>
              )}

              {!isLastPage ? (
                <Button 
                  type="button" 
                  onClick={nextPage}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Form
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Progress indicator */}
      <div className="mt-4 flex justify-center">
        <div className="flex space-x-2">
          {pages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentPageIndex 
                  ? 'bg-purple-600' 
                  : index < currentPageIndex 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
