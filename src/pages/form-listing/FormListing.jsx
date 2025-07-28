import React, { useState, useMemo } from "react";
import "./FormListing.css";
import { Search, ArrowUpDown } from "lucide-react";
import FormCard from "./FormCard";
import { forms } from "./data";

const FormListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'

  // Get unique categories and authors
  const uniqueCategories = [...new Set(forms.map((form) => form.category))];
  const uniqueAuthors = [...new Set(forms.map((form) => form.author))];

  // Parse date from French format
  const parseDate = (dateString) => {
    // Extract date from "Publié le 08 Juin 2026 à 16:36"
    const dateMatch = dateString.match(/(\d{2}) (\w+) (\d{4})/);
    if (!dateMatch) return new Date();

    const months = {
      Janvier: 0,
      Février: 1,
      Mars: 2,
      Avril: 3,
      Mai: 4,
      Juin: 5,
      Juillet: 6,
      Août: 7,
      Septembre: 8,
      Octobre: 9,
      Novembre: 10,
      Décembre: 11,
    };

    const day = parseInt(dateMatch[1]);
    const month = months[dateMatch[2]];
    const year = parseInt(dateMatch[3]);

    return new Date(year, month, day);
  };

  // Filter and sort forms
  const filteredAndSortedForms = useMemo(() => {
    let filtered = forms.filter((form) => {
      const matchesSearch =
        form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory || form.category === selectedCategory;
      const matchesAuthor = !selectedAuthor || form.author === selectedAuthor;

      return matchesSearch && matchesCategory && matchesAuthor;
    });

    // Sort by publication date
    filtered.sort((a, b) => {
      const dateA = parseDate(a.publishDate);
      const dateB = parseDate(b.publishDate);

      if (sortOrder === "desc") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedAuthor, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <div className="card-container">
      <h2 className="header">
        <span className="purple-bar"></span> Création d'un formulaire
      </h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="rechercher..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="search-btn" />
      </div>

      <div className="filters-sort-section">
        <div className="filters">
          <span className="filter-label">Filtrer par</span>

          <button
            className={`filter-btn ${selectedCategory === "" ? "active" : ""}`}
            onClick={() => setSelectedCategory("")}
          >
            Catégorie
          </button>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? "" : category
                )
              }
            >
              {category}
            </button>
          ))}

          <button
            className={`filter-btn ${selectedAuthor === "" ? "active" : ""}`}
            onClick={() => setSelectedAuthor("")}
          >
            Auteur
          </button>
          {uniqueAuthors.map((author) => (
            <button
              key={author}
              className={`filter-btn ${
                selectedAuthor === author ? "active" : ""
              }`}
              onClick={() =>
                setSelectedAuthor(selectedAuthor === author ? "" : author)
              }
            >
              {author}
            </button>
          ))}
        </div>

        <div className="sort-section">
          <span className="sort-label">Trier par</span>
          <span className="sort-label">Date de publication</span>
          <button
            className="sort-order-btn"
            onClick={toggleSortOrder}
            title={
              sortOrder === "desc"
                ? "Plus récent en premier"
                : "Plus ancien en premier"
            }
          >
            <ArrowUpDown size={16} />
          </button>
        </div>
      </div>

      <div className="form-listing-container">
        {filteredAndSortedForms.length > 0 ? (
          filteredAndSortedForms.map((form) => (
            <FormCard
              key={form.id}
              title={form.title}
              category={form.category}
              categoryCount={form.categoryCount}
              author={form.author}
              publishDate={form.publishDate}
              expireDate={form.expireDate}
              responseCount={form.responseCount}
            />
          ))
        ) : (
          <div className="no-results">
            Aucun formulaire trouvé pour les critères sélectionnés.
          </div>
        )}
      </div>
    </div>
  );
};

export default FormListing;
