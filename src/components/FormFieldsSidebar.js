
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Type, 
  FileText, 
  ChevronDown, 
  CheckCircle, 
  Square, 
  Mail, 
  Hash 
} from 'lucide-react';
import './FormFieldsSidebar.css';

const formFields = [
  {
    id: 'text',
    label: 'Text Input',
    icon: Type,
    description: 'Single line text input'
  },
  {
    id: 'textarea',
    label: 'Textarea',
    icon: FileText,
    description: 'Multi-line text input'
  },
  {
    id: 'email',
    label: 'Email',
    icon: Mail,
    description: 'Email input with validation'
  },
  {
    id: 'number',
    label: 'Number',
    icon: Hash,
    description: 'Numeric input field'
  },
  {
    id: 'select',
    label: 'Select Dropdown',
    icon: ChevronDown,
    description: 'Dropdown selection'
  },
  {
    id: 'radio',
    label: 'Radio Buttons',
    icon: CheckCircle,
    description: 'Single choice selection'
  },
  {
    id: 'checkbox',
    label: 'Checkboxes',
    icon: Square,
    description: 'Multiple choice selection'
  }
];

const FormFieldsSidebar = () => {
  return (
    <Droppable droppableId="sidebar" isDropDisabled={true}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="fields-container">
          {formFields.map((field, index) => (
            <Draggable key={field.id} draggableId={field.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`field-item ${snapshot.isDragging ? 'dragging' : ''}`}
                >
                  <div className="field-content">
                    <field.icon className="field-icon" />
                    <div className="field-info">
                      <div className="field-name">{field.label}</div>
                      <div className="field-description">{field.description}</div>
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default FormFieldsSidebar;
