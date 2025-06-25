
import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Trash2, Copy, ArrowUp, ArrowDown, Plus, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import './PageCard.css';

const PageCard = ({
  page,
  pageIndex,
  totalPages,
  onDeletePage,
  onDuplicatePage,
  onMovePageUp,
  onMovePageDown,
  onDeleteField,
  onUpdateTitle,
  onUpdateDescription,
  onAddPage
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [titleValue, setTitleValue] = useState(page.title);
  const [descriptionValue, setDescriptionValue] = useState(page.description);

  const handleTitleSave = () => {
    onUpdateTitle(page.id, titleValue);
    setEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setTitleValue(page.title);
    setEditingTitle(false);
  };

  const handleDescriptionSave = () => {
    onUpdateDescription(page.id, descriptionValue);
    setEditingDescription(false);
  };

  const handleDescriptionCancel = () => {
    setDescriptionValue(page.description);
    setEditingDescription(false);
  };

  return (
    <Card className="page-card">
      <CardHeader className="page-header">
        <div className="page-title-section">
          {editingTitle ? (
            <div className="edit-field">
              <input
                type="text"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                className="page-title-input"
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
            <CardTitle className="page-title" onClick={() => setEditingTitle(true)}>
              {page.title}
              <Edit2 className="edit-icon" />
            </CardTitle>
          )}

          {editingDescription ? (
            <div className="edit-field">
              <input
                type="text"
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
                className="page-description-input"
                placeholder="Page description"
                autoFocus
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
            <p className="page-description" onClick={() => setEditingDescription(true)}>
              {page.description || 'Click to add description'}
              <Edit2 className="edit-icon" />
            </p>
          )}
        </div>

        <div className="page-actions">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDuplicatePage(page.id)}
            className="action-btn"
            title="Duplicate page"
          >
            <Copy className="icon" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onMovePageUp(page.id)}
            disabled={pageIndex === 0}
            className="action-btn"
            title="Move page up"
          >
            <ArrowUp className="icon" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onMovePageDown(page.id)}
            disabled={pageIndex === totalPages - 1}
            className="action-btn"
            title="Move page down"
          >
            <ArrowDown className="icon" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onAddPage}
            className="action-btn"
            title="Add new page"
          >
            <Plus className="icon" />
          </Button>
          {totalPages > 1 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDeletePage(page.id)}
              className="action-btn delete-btn"
              title="Delete page"
            >
              <Trash2 className="icon" />
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
              className={`drop-zone ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
            >
              {page.fields.length === 0 ? (
                <div className="empty-state">
                  <p className="empty-text">Drop form fields here</p>
                  <p className="empty-subtext">Drag elements from the sidebar to build your form</p>
                </div>
              ) : (
                page.fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`field-item ${snapshot.isDragging ? 'dragging' : ''}`}
                      >
                        <div className="field-header">
                          <label className="field-label">
                            {field.label}
                            {field.required && <span className="required">*</span>}
                          </label>
                          <button
                            onClick={() => onDeleteField(page.id, field.id)}
                            className="delete-field-btn"
                          >
                            <Trash2 className="icon" />
                          </button>
                        </div>
                        
                        {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            className="field-input"
                            disabled
                          />
                        ) : field.type === 'textarea' ? (
                          <textarea
                            placeholder={field.placeholder}
                            rows={3}
                            className="field-textarea"
                            disabled
                          />
                        ) : field.type === 'select' ? (
                          <select className="field-select" disabled>
                            <option>Select an option</option>
                            {field.options?.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : field.type === 'radio' ? (
                          <div className="field-options">
                            {field.options?.map((option, i) => (
                              <label key={i} className="option-label">
                                <input type="radio" name={field.id} className="option-input" disabled />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        ) : field.type === 'checkbox' ? (
                          <div className="field-options">
                            {field.options?.map((option, i) => (
                              <label key={i} className="option-label">
                                <input type="checkbox" className="option-input" disabled />
                                <span>{option}</span>
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
  );
};

export default PageCard;
