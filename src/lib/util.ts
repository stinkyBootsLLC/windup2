
// Shared Regex Constants
export const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,100}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const USA_PHONE_REGEX = /^(?:\+1\s?)?\(?([0-9][0-9][0-9])\)?[-.\s]?([0-9][0-9][0-9])[-.\s]?([0-9]{4})$/;

/**
 * Shared validation logic for common fields
 */
export const Validator = {
  isValidName: (val?: string) => !!val && NAME_REGEX.test(val),
  
  isValidEmail: (val?: string) => !!val && EMAIL_REGEX.test(val),
  
  isValidPhone: (val?: string) => {
    if (!val || val.trim() === "") return true; // Optional
    return USA_PHONE_REGEX.test(val);
  },

  isValidText: (val: string, min: number, max: number) => {
    const len = val.trim().length;
    return len >= min && len <= max;
  }
};

/**
 * Sanitize input (Existing function)
 */
export const sanitize = (str: string): string => {
  if (!str) return "";
  return str.replace(/<[^>]*>?/gm, "").trim();
};