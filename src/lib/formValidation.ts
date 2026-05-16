/**
 * Shared form validation helpers.
 * All functions are pure — return true if valid.
 */

export type FieldErrors = Record<string, string>;

export const required = (v: string) => v.trim().length > 0;

export const validPhone = (v: string) => {
  const digits = v.replace(/\D/g, '');
  // Accept 10-digit Indian mobiles, optionally prefixed with 91
  return (digits.length === 10) || (digits.length === 12 && digits.startsWith('91'));
};

export const validEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export const minLen = (v: string, n: number) => v.trim().length >= n;

/** Returns true when the errors object has no keys */
export const isValid = (errs: FieldErrors) => Object.keys(errs).length === 0;

/** Clear a single key from errors immutably */
export const clearError = (errs: FieldErrors, key: string): FieldErrors => {
  const next = { ...errs };
  delete next[key];
  return next;
};
