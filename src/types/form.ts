
export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'email' | 'number' | 'select' | 'radio' | 'checkbox';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface FormPage {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}
