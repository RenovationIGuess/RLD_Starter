import React, { useEffect, useState } from 'react';
import { images } from '~/constants';
import { IoIosArrowForward } from 'react-icons/io';
import { motion } from 'framer-motion';
import HoyoButton from '~/components/HoyoButton/HoyoButton';
import {
  errorVariants,
  itemVariants,
  parentVariants,
} from '~/constants/motion';
import FieldInput from './FieldInput';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axiosClient from '~/axios';
import { Link } from 'react-router-dom';

const InputSection = ({
  email,
  emailErr,
  onEmailFieldChange,
  onEmailFieldBlur,

  password,
  showPass,
  setShowPass,
  passwordErr,
  onPasswordFieldChange,
  onPasswordFieldBlur,

  passwordConfirmation,
  showConfPass,
  setShowConfPass,
  confPasswordErr,
  onConfPasswordFieldChange,
  onConfPasswordFieldBlur,

  status,
  handleChangeStatus,
  handleSignIn,
  handleSignUp,
  loading,
  count,
  handleClickField,
}) => {
  const [githubSignInUrl, setGithubSignInUrl] = useState('');
  const [googleSignInUrl, setGoogleSignInUrl] = useState('');

  useEffect(() => {}, []);

  useEffect(() => {
    axiosClient
      .get(`/auth/google/redirect`)
      .then(({ data }) => {
        // console.log(data);
        setGoogleSignInUrl(data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axiosClient
      .get(`/auth/github/redirect`)
      .then(({ data }) => {
        // console.log(data);
        setGithubSignInUrl(data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <motion.div
      variants={parentVariants}
      className="form__box-container-wrapper"
    >
      <motion.h1
        // onMouseOver={(e) => hoverText(e)}
        variants={itemVariants}
        // data-value={h1Text}
        id="form-title"
      >
        Sign In
      </motion.h1>

      {/* Email */}
      <FieldInput
        type={'email'}
        show={false}
        title={'Email address'}
        value={email}
        onChange={onEmailFieldChange}
        onBlur={onEmailFieldBlur}
        style={{ marginTop: '32px' }}
        handleClickField={handleClickField}
        error={emailErr}
        placeholder={'Please enter your email address'}
        inputId={'email-field'}
        inputType={'text'}
        maxLength={'100'}
        spanStyle={{}}
      />

      {/* Password */}
      <FieldInput
        type={'password'}
        show={showPass}
        title={'Password'}
        value={password}
        onChange={onPasswordFieldChange}
        onBlur={onPasswordFieldBlur}
        style={{}}
        handleClickField={handleClickField}
        error={passwordErr}
        placeholder={'Please enter your password'}
        inputId={'pass-field'}
        inputType={showPass ? 'text' : 'password'}
        maxLength={'100'}
        spanStyle={{ fontSize: '20px' }}
        setShow={setShowPass}
      />

      {/* Confirm Password */}
      <motion.div
        variants={itemVariants}
        animate={status ? 'open' : 'closed'}
        onClick={(e) => handleClickField(e)}
        className={status ? 'form__box-input-wrap' : 'closed'}
      >
        <p>Confirm Password</p>
        <input
          type={showConfPass ? 'text' : 'password'}
          maxLength="100"
          className="form__box-input"
          id="conf-pass-field"
          autoComplete="off"
          placeholder="Please re-enter your password"
          value={passwordConfirmation}
          onChange={(e) => onConfPasswordFieldChange(e)}
          onBlur={() => onConfPasswordFieldBlur()}
        />
        <span style={{ fontSize: '20px' }} className="count-tip">
          {showConfPass ? (
            <AiFillEyeInvisible
              // className="login__box-input-password-eye-icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowConfPass(false);
              }}
            />
          ) : (
            <AiFillEye
              // className="login__box-input-password-eye-icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowConfPass(true);
              }}
            />
          )}
        </span>
      </motion.div>
      <motion.p
        variants={errorVariants}
        className={status && confPasswordErr.status ? 'error-text' : 'closed'}
        animate={status && confPasswordErr.status ? 'open' : 'closed'}
      >
        {confPasswordErr.msg}
      </motion.p>

      {count > 0 ? (
        <motion.div
          variants={itemVariants}
          onClick={(e) => handleClickField(e)}
          className={status ? 'closed' : 'form__box-other-opts'}
          animate={status ? 'closed' : 'open'}
        >
          <p className="forget_password">Forget Password?</p>
          <p onClick={() => handleChangeStatus()} className="switch_status">
            Register Now
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          onClick={(e) => handleClickField(e)}
          className={status ? 'closed' : 'form__box-other-opts'}
        >
          <p className="forget_password">Forget Password?</p>
          <p onClick={() => handleChangeStatus()} className="switch_status">
            Register Now
          </p>
        </motion.div>
      )}
      <HoyoButton
        variants={itemVariants}
        loading={loading}
        description="Sign In"
        handleFunc={status ? handleSignUp : handleSignIn}
      />
      <motion.div variants={parentVariants} className="form__box-3rd-plat">
        <motion.div variants={itemVariants}>Or using social media</motion.div>
        <motion.div variants={parentVariants} className="third-party-icons">
          <motion.div variants={itemVariants}>
            <Link to={googleSignInUrl}>
              <img src={images.google} alt="google-icon" />
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to={githubSignInUrl}>
              <img src={images.github} alt="github-icon" />
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <img src={images.facebook} alt="facebook-icon" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <img src={images.twitter} alt="twitter-icon" />
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        onClick={() => handleChangeStatus()}
        className={status ? 'back-to-login' : 'closed'}
        animate={status ? 'open' : 'closed'}
        variants={itemVariants}
      >
        <p>Return to Login</p>
        <IoIosArrowForward className="arrow" />
      </motion.div>
    </motion.div>
  );
};

export default InputSection;
