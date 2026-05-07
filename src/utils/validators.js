export const cleanCep = (value) => {
  if (!value) return '';
  return value.toString().replace(/\D/g, '');
};

export const isValidCep = (value) => {
  const cleaned = cleanCep(value);
  return cleaned.length === 8;
};

export const cleanDdd = (value) => {
  if (!value) return '';
  return value.toString().replace(/\D/g, '');
};

export const isValidDdd = (value) => {
  const cleaned = cleanDdd(value);
  return cleaned.length === 2;
};

export const cleanYear = (value) => {
  if (!value) return '';
  return value.toString().replace(/\D/g, '');
};

export const isValidYear = (value) => {
  const cleaned = cleanYear(value);
  if (cleaned.length !== 4) return false;
  
  const yearNum = parseInt(cleaned, 10);
  return yearNum >= 1900 && yearNum <= 2100;
};

export const isValidEmail = (value) => {
  if (!value) return false;
  // Expressão regular básica para validar formato de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};
