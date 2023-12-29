import React from 'react';
import useComponentVisible from '~/hooks/useComponentVisible';
import { cn } from '~/utils';

const FormInput = ({
  label,
  data,
  setData,
  field,
  error,
  type,
  maxLength,
  placeholder,
  size = 'md',
}) => {
  const [inputRef, focused, setFocused] = useComponentVisible(false);

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
            'social-input-container',
            focused && 'social-input-container--active',
            error?.state &&
              Array.isArray(error[field]) &&
              error[field].length !== 0 &&
              data[field].length === 0 &&
              'social-input-container--error'
          )}
        >
          <input
            type={type}
            maxLength={maxLength}
            placeholder={placeholder}
            value={data[field]}
            onChange={(e) => setData({ ...data, [field]: e.target.value })}
          />
          <span className="count-tip">{data[field].length}/200</span>
        </div>
      </div>
      {error?.state &&
        data[field].length === 0 &&
        Array.isArray(error[field]) &&
        (error[field].length !== 0) !== 0 &&
        error[field].map((err, index) => (
          <p key={index} className="error-text font-normal">
            {err}
          </p>
        ))}
    </div>
  );
};

export default FormInput;
