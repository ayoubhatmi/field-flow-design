
import React, { useState } from 'react';
import { Eye, Plus, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './FormHeader.css';

const FormHeader = ({ 
  form, 
  onTitleChange, 
  onDescriptionChange, 
  onPreview, 
  onAddPage 
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [titleValue, setTitleValue] = useState(form.title);
  const [descriptionValue, setDescriptionValue] = useState(form.description);

  const handleTitleSave = () => {
    onTitleChange(titleValue);
    setEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setTitleValue(form.title);
    setEditingTitle(false);
  };

  const handleDescriptionSave = () => {
    onDescriptionChange(descriptionValue);
    setEditingDescription(false);
  };

  const handleDescriptionCancel = () => {
    setDescriptionValue(form.description);
    setEditingDescription(false);
  };

  return (
    <div className="form-header">
      <div className="form-title-section">
        {editingTitle ? (
          <div className="edit-field">
            <input
              type="text"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              className="title-input"
              autoFocus
            />
            <div className="edit-buttons">
              <button onClick={handleTitleSave} className="save-btn">
                <Check className="icon" />
              </button>
              <button onClick={handleTitleCancel} className="cancel-btn">
                <X className="icon" />
              </button>
            </div>
          </div>
        ) : (
          <div className="title-display" onClick={() => setEditingTitle(true)}>
            <h1>{form.title}</h1>
            <Edit2 className="edit-icon" />
          </div>
        )}

        {editingDescription ? (
          <div className="edit-field">
            <textarea
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
              className="description-input"
              autoFocus
              rows={2}
            />
            <div className="edit-buttons">
              <button onClick={handleDescriptionSave} className="save-btn">
                <Check className="icon" />
              </button>
              <button onClick={handleDescriptionCancel} className="cancel-btn">
                <X className="icon" />
              </button>
            </div>
          </div>
        ) : (
          <div className="description-display" onClick={() => setEditingDescription(true)}>
            <p>{form.description || 'Click to add description'}</p>
            <Edit2 className="edit-icon" />
          </div>
        )}
      </div>

      <div className="header-buttons">
        <Button onClick={onPreview} className="preview-btn">
          <Eye className="icon" />
          Preview
        </Button>
        <Button onClick={onAddPage} variant="outline" className="add-page-btn">
          <Plus className="icon" />
          Add Page
        </Button>
      </div>
    </div>
  );
};

export default FormHeader;
