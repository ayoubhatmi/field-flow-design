
export const createFormField = (id, type, label) => ({
  id,
  type,
  label,
  placeholder: `Enter ${type}...`,
  required: false,
  options: type === 'select' || type === 'radio' || type === 'checkbox' 
    ? ['Option 1', 'Option 2', 'Option 3'] 
    : undefined
});

export const createFormPage = (id, title) => ({
  id,
  title,
  description: '',
  fields: []
});

export const createForm = (id, title) => ({
  id,
  title,
  description: '',
  pages: []
});
