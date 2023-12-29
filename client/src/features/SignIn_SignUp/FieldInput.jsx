import React from 'react';
import { errorVariants, itemVariants } from '~/constants/motion';
import { motion } from 'framer-motion';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

// Type: email | password |
// show: boolean - use to show/hide password | confirm password
const FieldInput = ({
  type,
  show,
  setShow,
  title,
  value,
  onChange,
  onBlur,
  style,
  handleClickField,
  error,
  placeholder,
  inputId,
  inputType,
  maxLength,
  spanStyle,
}) => {
  return (
    <>
      <motion.div
        variants={itemVariants}
        onClick={(e) => handleClickField(e)}
        className="form__box-input-wrap"
        style={style}
      >
        <p>{title}</p>
        <input
          type={inputType}
          maxLength={maxLength}
          className="form__box-input"
          id={inputId}
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          onBlur={(e) => onBlur(e)}
        />
        <span style={spanStyle} className="count-tip">
          {type !== 'password' && `${value.length}/100`}
          {type === 'password' &&
            (show ? (
              <AiFillEyeInvisible
                onClick={(e) => {
                  e.stopPropagation();
                  setShow(false);
                }}
              />
            ) : (
              <AiFillEye
                onClick={(e) => {
                  e.stopPropagation();
                  setShow(true);
                }}
              />
            ))}
        </span>
      </motion.div>
      <motion.p
        variants={errorVariants}
        className={error.status ? 'error-text' : 'closed'}
        animate={error.status ? 'open' : 'closed'}
      >
        {error.msg}
      </motion.p>
    </>
  );
};

export default FieldInput;
