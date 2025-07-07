import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
  Type,
  FileText,
  ChevronDown,
  CheckCircle,
  Square,
  Mail,
  Hash,
  Calendar,
  Clock,
  Link,
  Phone,
  User,
  Briefcase,
  Building,
  MapPin,
  PhoneCall,
  Smartphone,
  AtSign,
} from "lucide-react";
import "@/css/FormFieldsSidebar.css";

const fieldGroups = [
  {
    title: "Champs de base",
    fields: [
      { id: "text", label: "Texte court", icon: Type },
      { id: "textarea", label: "Texte long", icon: FileText },
      { id: "number", label: "Nombre", icon: Hash },
      { id: "select", label: "Liste déroulante", icon: ChevronDown },
      {
        id: "radio",
        label: "Boutons radio (choix unique)",
        icon: CheckCircle,
      },
      {
        id: "checkbox",
        label: "Cases à cocher (choix multiple)",
        icon: Square,
      },
    ],
  },
  {
    title: "Champs spéciaux",
    fields: [
      { id: "date", label: "Date", icon: Calendar },
      { id: "time", label: "Heure", icon: Clock },
      { id: "email", label: "Email", icon: Mail },
      { id: "tel", label: "Téléphone", icon: Phone },
      { id: "url", label: "URL", icon: Link },
    ],
  },
  {
    title: "Champs pré-remplis",
    fields: [
      { id: "full_name", label: "Nom complet", icon: User },
      { id: "job_title", label: "Fonction", icon: Briefcase },
      { id: "department", label: "Direction", icon: Building },
      { id: "location", label: "Localisation", icon: MapPin },
      { id: "landline", label: "Téléphone fixe", icon: PhoneCall },
      { id: "mobile", label: "Téléphone mobile", icon: Smartphone },
      { id: "email_info", label: "Adresse e-mail", icon: AtSign },
    ],
  },
];

const FormFieldsSidebar = () => {
  return (
    <div className="sidebar-container">
      <Droppable droppableId="sidebar" isDropDisabled={true}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="sidebar-content"
          >
            {fieldGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="group-title">{group.title}</h3>
                <div className="fields-container">
                  {group.fields.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
                      index={groupIndex * 100 + index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`w-full ${
                            snapshot.isDragging ? "dragging" : ""
                          }`}
                        >
                          <div className="button-custom w-full">
                            <field.icon className="icon-btn" />
                            {field.label}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default FormFieldsSidebar;
