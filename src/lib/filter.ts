export const Filter = {
  // Equivalent to FILTER_SANITIZE_STRING / strip_tags
  text: (val: any, maxLen = 255): string => {
    if (typeof val !== 'string') return '';
    return val
      .replace(/<[^>]*>?/gm, '') // Strip HTML tags
      .trim()
      .substring(0, maxLen);
  },

  // Equivalent to FILTER_SANITIZE_EMAIL
  email: (val: any): string => {
    if (typeof val !== 'string') return '';
    return val.toLowerCase().trim().substring(0, 100);
  },

  // Equivalent to FILTER_SANITIZE_NUMBER_INT
  int: (val: any): number => {
    const parsed = parseInt(val, 10);
    return isNaN(parsed) ? 0 : parsed;
  },

  // Custom USA Phone sanitizer
  phone: (val: any): string => {
    if (typeof val !== 'string') return '';
    // Strip everything except numbers
    const cleaned = val.replace(/\D/g, '');
    return cleaned.length === 10 ? cleaned : ''; 
  }
};