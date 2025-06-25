
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Plus, Trash2, Eye, Settings, Copy, ArrowUp, ArrowDown, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FormFieldsSidebar from './FormFieldsSidebar';
import FormPreview from './FormPreview';
import { FormField, FormPage } from '../types/form';

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('My Form');
  const [formDescription, setFormDescription] = useState('Please fill out this form');
  const [editingFormTitle, setEditingFormTitle] = useState(false);
  const [editingFormDescription, setEditingFormDescription] = useState(false);
  
  const [pages, setPages] = useState<FormPage[]>([
    {
      id: 'page-1',
      title: 'Page 1',
      description: 'Enter your information below',
      fields: []
    }
  ]);
  
  const [previewMode, setPreviewMode] = useState(false);
  const [editingPageTitle, setEditingPageTitle] = useState<string | null>(null);
  const [editingPageDescription, setEditingPageDescription] = useState<string | null>(null);
  const [editingFieldLabel, setEditingFieldLabel] = useState<string | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // If dropping from sidebar to form
    if (source.droppableId === 'sidebar' && destination.droppableId.startsWith('page-')) {
      const pageId = destination.droppableId;
      const fieldType = draggableId;
      
      const newField: FormField = {
        id: `field-${Date.now()}`,
        type: fieldType as FormField['type'],
        label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
        required: false,
        placeholder: `Enter ${fieldType}...`,
        options: fieldType === 'select' || fieldType === 'radio' || fieldType === 'checkbox' 
          ? ['Option 1', 'Option 2', 'Option 3'] 
          : undefined
      };

      setPages(prev => prev.map(page => 
        page.id === pageId 
          ? { ...page, fields: [...page.fields, newField] }
          : page
      ));
    }

    // If moving field between pages or reordering within the same page
    if (source.droppableId.startsWith('page-') && destination.droppableId.startsWith('page-')) {
      const sourcePageId = source.droppableId;
      const destPageId = destination.droppableId;
      
      setPages(prev => {
        const newPages = [...prev];
        const sourcePageIndex = newPages.findIndex(page => page.id === sourcePageId);
        const destPageIndex = newPages.findIndex(page => page.id === destPageId);
        
        // Get the field being moved
        const [movedField] = newPages[sourcePageIndex].fields.splice(source.index, 1);
        
        // Add it to the destination page
        newPages[destPageIndex].fields.splice(destination.index, 0, movedField);
        
        return newPages;
      });
    }
  };

  const addPage = () => {
    const newPage: FormPage = {
      id: `page-${Date.now()}`,
      title: `Page ${pages.length + 1}`,
      description: 'Add your description here',
      fields: []
    };
    
    setPages(prev => [...prev, newPage]);
  };

  const deletePage = (pageId: string) => {
    if (pages.length === 1) return; // Don't delete the last page
    
    setPages(prev => prev.filter(page => page.id !== pageId));
  };

  const duplicatePage = (pageId: string) => {
    const pageIndex = pages.findIndex(page => page.id === pageId);
    const pageToDuplicate = pages[pageIndex];
    
    const duplicatedPage: FormPage = {
      id: `page-${Date.now()}`,
      title: `${pageToDuplicate.title} Copy`,
      description: pageToDuplicate.description,
      fields: pageToDuplicate.fields.map(field => ({
        ...field,
        id: `field-${Date.now()}-${Math.random()}`
      }))
    };
    
    const newPages = [...pages];
    newPages.splice(pageIndex + 1, 0, duplicatedPage);
    setPages(newPages);
  };

  const movePageUp = (pageId: string) => {
    const pageIndex = pages.findIndex(page => page.id === pageId);
    if (pageIndex > 0) {
      const newPages = [...pages];
      [newPages[pageIndex - 1], newPages[pageIndex]] = [newPages[pageIndex], newPages[pageIndex - 1]];
      setPages(newPages);
    }
  };

  const movePageDown = (pageId: string) => {
    const pageIndex = pages.findIndex(page => page.id === pageId);
    if (pageIndex < pages.length - 1) {
      const newPages = [...pages];
      [newPages[pageIndex], newPages[pageIndex + 1]] = [newPages[pageIndex + 1], newPages[pageIndex]];
      setPages(newPages);
    }
  };

  const deleteField = (pageId: string, fieldId: string) => {
    setPages(prev => prev.map(page => 
      page.id === pageId 
        ? { ...page, fields: page.fields.filter(field => field.id !== fieldId) }
        : page
    ));
  };

  const updatePageTitle = (pageId: string, title: string) => {
    setPages(prev => prev.map(page => 
      page.id === pageId ? { ...page, title } : page
    ));
  };

  const updatePageDescription = (pageId: string, description: string) => {
    setPages(prev => prev.map(page => 
      page.id === pageId ? { ...page, description } : page
    ));
  };

  const updateFieldLabel = (pageId: string, fieldId: string, label: string) => {
    setPages(prev => prev.map(page => 
      page.id === pageId 
        ? { 
            ...page, 
            fields: page.fields.map(field => 
              field.id === fieldId ? { ...field, label } : field
            )
          }
        : page
    ));
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto p-4">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-800">Form Preview</h1>
            <Button onClick={() => setPreviewMode(false)} variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Back to Editor
            </Button>
          </div>
          <FormPreview 
            formTitle={formTitle} 
            formDescription={formDescription} 
            pages={pages} 
          />
        </div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg border-r border-purple-100">
          <div className="p-4 border-b border-purple-100">
            <h2 className="text-lg font-semibold text-purple-800 mb-2">Form Elements</h2>
            <p className="text-sm text-purple-600">Drag elements to your form</p>
          </div>
          <FormFieldsSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Form Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {editingFormTitle ? (
                  <Input
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    onBlur={() => setEditingFormTitle(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingFormTitle(false)}
                    className="text-3xl font-bold text-purple-800 border-none p-0 shadow-none"
                    autoFocus
                  />
                ) : (
                  <h1 
                    className="text-3xl font-bold text-purple-800 cursor-pointer hover:bg-purple-50 rounded p-2 inline-flex items-center gap-2"
                    onClick={() => setEditingFormTitle(true)}
                  >
                    {formTitle}
                    <Edit2 className="w-5 h-5 opacity-50" />
                  </h1>
                )}
                
                {editingFormDescription ? (
                  <Textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    onBlur={() => setEditingFormDescription(false)}
                    className="text-purple-600 border-none p-0 shadow-none resize-none"
                    autoFocus
                  />
                ) : (
                  <p 
                    className="text-purple-600 cursor-pointer hover:bg-purple-50 rounded p-2 inline-flex items-center gap-2"
                    onClick={() => setEditingFormDescription(true)}
                  >
                    {formDescription}
                    <Edit2 className="w-4 h-4 opacity-50" />
                  </p>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => setPreviewMode(true)} className="bg-purple-600 hover:bg-purple-700">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button onClick={addPage} variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Page
                </Button>
              </div>
            </div>
          </div>

          {/* Pages displayed vertically */}
          <div className="space-y-6">
            {pages.map((page, pageIndex) => (
              <Card key={page.id} className="min-h-96 border-2 border-dashed border-purple-200 bg-white/50 relative">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex-1">
                    {editingPageTitle === page.id ? (
                      <Input
                        value={page.title}
                        onChange={(e) => updatePageTitle(page.id, e.target.value)}
                        onBlur={() => setEditingPageTitle(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingPageTitle(null)}
                        className="text-lg font-semibold text-purple-800 border-none p-0 shadow-none"
                        autoFocus
                      />
                    ) : (
                      <CardTitle 
                        className="text-purple-800 cursor-pointer hover:bg-purple-50 rounded p-2 inline-flex items-center gap-2"
                        onClick={() => setEditingPageTitle(page.id)}
                      >
                        {page.title}
                        <Edit2 className="w-4 h-4 opacity-50" />
                      </CardTitle>
                    )}
                    
                    {editingPageDescription === page.id ? (
                      <Input
                        value={page.description}
                        onChange={(e) => updatePageDescription(page.id, e.target.value)}
                        onBlur={() => setEditingPageDescription(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingPageDescription(null)}
                        className="text-sm text-purple-600 border-none p-0 shadow-none mt-1"
                        autoFocus
                      />
                    ) : (
                      <p 
                        className="text-sm text-purple-600 cursor-pointer hover:bg-purple-50 rounded p-1 inline-flex items-center gap-2 mt-1"
                        onClick={() => setEditingPageDescription(page.id)}
                      >
                        {page.description}
                        <Edit2 className="w-3 h-3 opacity-50" />
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => duplicatePage(page.id)}
                      className="h-8 w-8 p-0 text-purple-600 hover:text-purple-800 hover:bg-purple-100"
                      title="Duplicate page"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => movePageUp(page.id)}
                      disabled={pageIndex === 0}
                      className="h-8 w-8 p-0 text-purple-600 hover:text-purple-800 hover:bg-purple-100 disabled:opacity-30"
                      title="Move page up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => movePageDown(page.id)}
                      disabled={pageIndex === pages.length - 1}
                      className="h-8 w-8 p-0 text-purple-600 hover:text-purple-800 hover:bg-purple-100 disabled:opacity-30"
                      title="Move page down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={addPage}
                      className="h-8 w-8 p-0 text-purple-600 hover:text-purple-800 hover:bg-purple-100"
                      title="Add new page"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    {pages.length > 1 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deletePage(page.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
                        title="Delete page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId={page.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-64 p-4 rounded-lg transition-colors ${
                          snapshot.isDraggingOver 
                            ? 'bg-purple-100 border-purple-300' 
                            : 'bg-white/70'
                        }`}
                      >
                        {page.fields.length === 0 ? (
                          <div className="text-center text-purple-400 py-12">
                            <p className="text-lg mb-2">Drop form fields here</p>
                            <p className="text-sm">Drag elements from the sidebar to build your form</p>
                          </div>
                        ) : (
                          page.fields.map((field, index) => (
                            <Draggable key={field.id} draggableId={field.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`mb-4 p-4 bg-white rounded-lg border border-purple-200 shadow-sm group hover:shadow-md transition-shadow ${
                                    snapshot.isDragging ? 'shadow-lg ring-2 ring-purple-300' : ''
                                  }`}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    {editingFieldLabel === field.id ? (
                                      <Input
                                        value={field.label}
                                        onChange={(e) => updateFieldLabel(page.id, field.id, e.target.value)}
                                        onBlur={() => setEditingFieldLabel(null)}
                                        onKeyDown={(e) => e.key === 'Enter' && setEditingFieldLabel(null)}
                                        className="text-sm font-medium text-gray-700 border-none p-0 shadow-none"
                                        autoFocus
                                      />
                                    ) : (
                                      <label 
                                        className="block text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 rounded p-1 inline-flex items-center gap-2"
                                        onClick={() => setEditingFieldLabel(field.id)}
                                      >
                                        {field.label}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                        <Edit2 className="w-3 h-3 opacity-50" />
                                      </label>
                                    )}
                                    <button
                                      onClick={() => deleteField(page.id, field.id)}
                                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  
                                  {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
                                    <input
                                      type={field.type}
                                      placeholder={field.placeholder}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                      disabled
                                    />
                                  ) : field.type === 'textarea' ? (
                                    <textarea
                                      placeholder={field.placeholder}
                                      rows={3}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                      disabled
                                    />
                                  ) : field.type === 'select' ? (
                                    <select
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                      disabled
                                    >
                                      <option>Select an option</option>
                                      {field.options?.map((option, i) => (
                                        <option key={i} value={option}>{option}</option>
                                      ))}
                                    </select>
                                  ) : field.type === 'radio' ? (
                                    <div className="space-y-2">
                                      {field.options?.map((option, i) => (
                                        <label key={i} className="flex items-center">
                                          <input type="radio" name={field.id} className="mr-2" disabled />
                                          <span className="text-sm text-gray-700">{option}</span>
                                        </label>
                                      ))}
                                    </div>
                                  ) : field.type === 'checkbox' ? (
                                    <div className="space-y-2">
                                      {field.options?.map((option, i) => (
                                        <label key={i} className="flex items-center">
                                          <input type="checkbox" className="mr-2" disabled />
                                          <span className="text-sm text-gray-700">{option}</span>
                                        </label>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                              )}
                            </Draggable>
                          ))
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default FormBuilder;
