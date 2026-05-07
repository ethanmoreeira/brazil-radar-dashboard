export const formatCep = (value) => {
  if (!value) return '';
  
  const cleaned = value.toString().replace(/\D/g, '');
  
  if (cleaned.length !== 8) {
    return value;
  }
  
  return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
};

export const formatDateBR = (dateString) => {
  if (!dateString) return '';
  
  try {
    // A API retorna yyyy-mm-dd
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateString;
  } catch {
    return dateString;
  }
};

export const formatDateTimeBR = (isoString) => {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  } catch {
    return isoString;
  }
};
