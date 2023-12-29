import React from 'react';
import { cn } from '~/utils';
import BlockNoteEditor from '../BlockNoteEditor/BlockNoteEditor';
import BlockNotePlain from '../BlockNoteEditor/BlockNotePlain';
import useComponentVisible from '~/hooks/useComponentVisible';

const FormInputWrap = ({
  label,
  data,
  children,
  field,
  errors,
  size = 'md',
}) => {
  const [inputRef, focused, setFocused] =
    useComponentVisible(false);

  return (
    <div className="form-item-container">
      <span className="form-item-container__label">{label}</span>
      <div
        className={cn(
          'social-input-title-text',
          size === 'sm' && 'social-input-title-text--sm',
          size === 'blocknote' && 'form-blocknote__wrapper'
        )}
      >
        <div
          onClick={() => setFocused(true)}
          ref={inputRef}
          className={cn(
            size === 'blocknote'
              ? 'blocknote-input-container'
              : 'social-input-container',
            focused && 'social-input-container--active',
            errors?.state &&
              data[field].length === 0 &&
              errors[field]?.length !== 0 &&
              'social-input-container--error'
          )}
        >
          {children}
        </div>
      </div>
      {errors?.state &&
        data[field].length === 0 &&
        errors[field].length !== 0 &&
        errors[field].map((error, index) => (
          <p key={index} className="error-text font-normal">
            {error}
          </p>
        ))}
    </div>
  );
};

export default FormInputWrap;
