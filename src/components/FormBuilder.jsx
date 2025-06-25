
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Trash2, Eye, Settings, Copy, ArrowUp, ArrowDown, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FormFieldsSidebar from './FormFieldsSidebar';
import FormPreview from './FormPreview';
import FormHeader from './FormHeader';
import PageCard from './PageCard';
import './FormBuilder.css';

const FormBuilder = () => {
  const [form, setForm] = useState({
    id: 'form-1',
    title: 'My Form',
    description: 'Form description',
    pages: [
      {
        id: 'page-1',
        title: 'Page 1',
        description: '',
        fields: []
      }
    ]
  });
  
  const [previewMode, setPreviewMode] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // If dropping from sidebar to form
    if (source.droppableId === 'sidebar' && destination.droppableId.startsWith('page-')) {
      const pageId = destination.droppableId;
      const fieldType = draggableId;
      
      const newField = {
        id: `field-${Date.now()}`,
        type: fieldType,
        label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
        required: false,
        placeholder: `Enter ${fieldType}...`,
        options: fieldType === 'select' || fieldType === 'radio' || fieldType === 'checkbox' 
          ? ['Option 1', 'Option 2', 'Option 3'] 
          : undefined
      };

      setForm(prev => ({
        ...prev,
        pages: prev.pages.map(page => 
          page.id === pageId 
            ? { ...page, fields: [...page.fields, newField] }
            : page
        )
      }));
    }

    // If reordering within the same page
    if (source.droppableId === destination.droppableId && source.droppableId.startsWith('page-')) {
      const pageId = source.droppableId;
      setForm(prev => ({
        ...prev,
        pages: prev.pages.map(page => {
          if (page.id === pageId) {
            const newFields = Array.from(page.fields);
            const [reorderedField] = newFields.splice(source.index, 1);
            newFields.splice(destination.index, 0, reorderedField);
            return { ...page, fields: newFields };
          }
          return page;
        })
      }));
    }

    // If moving field between pages
    if (source.droppableId !== destination.droppableId && 
        source.droppableId.startsWith('page-') && 
        destination.droppableId.startsWith('page-')) {
      
      const sourcePageId = source.droppableId;
      const destPageId = destination.droppableId;
      
      setForm(prev => {
        const newPages = prev.pages.map(page => {
          if (page.id === sourcePageId) {
            const newFields = [...page.fields];
            const [movedField] = newFields.splice(source.index, 1);
            return { ...page, fields: newFields };
          }
          if (page.id === destPageId) {
            const sourcePageFields = prev.pages.find(p => p.id === sourcePageId).fields;
            const fieldToMove = sourcePageFields[source.index];
            const newFields = [...page.fields];
            newFields.splice(destination.index, 0, fieldToMove);
            return { ...page, fields: newFields };
          }
          return page;
        });
        
        return { ...prev, pages: newPages };
      });
    }
  };

  const addPage = () => {
    const newPage = {
      id: `page-${Date.now()}`,
      title: `Page ${form.pages.length + 1}`,
      description: '',
      fields: []
    };
    
    setForm(prev => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));
  };

  const deletePage = (pageId) => {
    if (form.pages.length === 1) return;
    
    setForm(prev => ({
      ...prev,
      pages: prev.pages.filter(page => page.id !== pageId)
    }));
  };

  const duplicatePage = (pageId) => {
    const pageIndex = form.pages.findIndex(page => page.id === pageId);
    const pageToDuplicate = form.pages[pageIndex];
    
    const duplicatedPage = {
      id: `page-${Date.now()}`,
      title: `${pageToDuplicate.title} Copy`,
      description: pageToDuplicate.description,
      fields: pageToDuplicate.fields.map(field => ({
        ...field,
        id: `field-${Date.now()}-${Math.random()}`
      }))
    };
    
    const newPages = [...form.pages];
    newPages.splice(pageIndex + 1, 0, duplicatedPage);
    setForm(prev => ({ ...prev, pages: newPages }));
  };

  const movePageUp = (pageId) => {
    const pageIndex = form.pages.findIndex(page => page.id === pageId);
    if (pageIndex > 0) {
      const newPages = [...form.pages];
      [newPages[pageIndex - 1], newPages[pageIndex]] = [newPages[pageIndex], newPages[pageIndex - 1]];
      setForm(prev => ({ ...prev, pages: newPages }));
    }
  };

  const movePageDown = (pageId) => {
    const pageIndex = form.pages.findIndex(page => page.id === pageId);
    if (pageIndex < form.pages.length - 1) {
      const newPages = [...form.pages];
      [newPages[pageIndex], newPages[pageIndex + 1]] = [newPages[pageIndex + 1], newPages[pageIndex]];
      setForm(prev => ({ ...prev, pages: newPages }));
    }
  };

  const deleteField = (pageId, fieldId) => {
    setForm(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === pageId 
          ? { ...page, fields: page.fields.filter(field => field.id !== fieldId) }
          : page
      )
    }));
  };

  const updatePageTitle = (pageId, title) => {
    setForm(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === pageId ? { ...page, title } : page
      )
    }));
  };

  const updatePageDescription = (pageId, description) => {
    setForm(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === pageId ? { ...page, description } : page
      )
    }));
  };

  const updateFormTitle = (title) => {
    setForm(prev => ({ ...prev, title }));
  };

  const updateFormDescription = (description) => {
    setForm(prev => ({ ...prev, description }));
  };

  if (previewMode) {
    return (
      <div className="form-builder-preview">
        <div className="container">
          <div className="preview-header">
            <h1>Form Preview</h1>
            <Button onClick={() => setPreviewMode(false)} variant="outline">
              <Settings className="icon" />
              Back to Editor
            </Button>
          </div>
          <FormPreview pages={form.pages} />
        </div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="form-builder">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Form Elements</h2>
            <p>Drag elements to your form</p>
          </div>
          <FormFieldsSidebar />
        </div>

        {/* Main Content */}
        <div className="main-content">
          <FormHeader 
            form={form}
            onTitleChange={updateFormTitle}
            onDescriptionChange={updateFormDescription}
            onPreview={() => setPreviewMode(true)}
            onAddPage={addPage}
          />

          {/* Pages displayed vertically */}
          <div className="pages-container">
            {form.pages.map((page, pageIndex) => (
              <PageCard
                key={page.id}
                page={page}
                pageIndex={pageIndex}
                totalPages={form.pages.length}
                onDeletePage={deletePage}
                onDuplicatePage={duplicatePage}
                onMovePageUp={movePageUp}
                onMovePageDown={movePageDown}
                onDeleteField={deleteField}
                onUpdateTitle={updatePageTitle}
                onUpdateDescription={updatePageDescription}
                onAddPage={addPage}
              />
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default FormBuilder;
