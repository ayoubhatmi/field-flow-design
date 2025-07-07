export const STATIC_PREFILLED_VALUES = {
  full_name: "Jean Dupont",
  job_title: "Chef de projet",
  department: "Département Informatique",
  location: "Paris - Siège",
  landline: "01 23 45 67 89",
  mobile: "06 12 34 56 78",
  email_info: "jean.dupont@example.com",
};

export const DEFAULT_PREFILLED_LABELS = {
  full_name: "Nom complet",
  job_title: "Fonction",
  department: "Direction",
  location: "Localisation",
  landline: "Téléphone fixe",
  mobile: "Téléphone mobile",
  email_info: "Adresse e-mail",
};

export const PREFILLED_FIELD_TYPES = new Set([
  "full_name",
  "email_info",
  "job_title",
  "department",
  "location",
  "landline",
  "mobile",
]);

export const OPTION_FIELD_TYPES = new Set(["select", "radio", "checkbox"]);

export const PLACEHOLDER_MAP = {
  tel: "(+33) 01 23 45 67 89",
  url: "https://",
  email: "nom@exemple.com",
};
