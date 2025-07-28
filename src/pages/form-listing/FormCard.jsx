import React from "react";
import { Calendar, Clock, FileSpreadsheet, Star } from "lucide-react";
import "./FormCard.css";

const FormCard = ({
  title,
  category,
  categoryCount,
  author,
  publishDate,
  expireDate,
  responseCount,
}) => {
  return (
    <div className="card">
      <div className="form-icon">
        <FileSpreadsheet size={48} />
      </div>

      <div className="card-content">
        <div className="flex-justify-between">
          <h3 className="card-title">{title}</h3>
          <Star size={24} className="star-icon" />
        </div>

        <div className="flex-justify-between">
          <div className="category-badges">
            <span className="category-badge primary">{category}</span>
            <span className="category-badge primary">{category}</span>
            <span className="category-badge primary">{category}</span>
          </div>

          <div className="card-info">
            <span className="author">Par {author}</span>
            <div className="date-info">
              <Calendar size={14} />
              <span>{publishDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
