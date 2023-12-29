import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export { default as objUtils } from './objUtils';
export { default as authFieldsCheck } from './authFieldsCheck';
export { default as stringUtils } from './stringUtils';
export { default as colorConverters } from './colorConverters';
export { default as scroll } from './scroll';
export { default as arrayUtils } from './arrayUtils';

// Validations
export function shouldShowError(errors, field, otherCondition = false) {
  if (errors.state) {
    if (errors[field]) {
      // if (fieldValue.length === 0) return true;
      return true;
    }
  }
  return false;
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
