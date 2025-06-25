
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
        <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 space-y-2">
          {formFields.map((field, index) => (
            <Draggable key={field.id} draggableId={field.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg cursor-grab hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-md ${
                    snapshot.isDragging ? 'rotate-3 shadow-xl' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <field.icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium text-sm">{field.label}</div>
                      <div className="text-xs opacity-90">{field.description}</div>
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
