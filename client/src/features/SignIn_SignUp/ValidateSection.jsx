import React from 'react';
import { images } from '~/constants';
import { motion } from 'framer-motion';
import {
  itemVariants,
  itemVariants2,
  parentVariants,
  errorVariants,
} from '~/constants/motion';
import ValidateField from './ValidateField';

const ValidateSection = ({
  emailReq,
  passwordReq,
  confPasswordReq,
  status,
  errorStatus,
}) => {
  return (
    <div className="status__panel-container">
      <div className="status__panel-img-wrapper">
        <div className="status__panel-img">
          <div className="status__panel-logo-wrapper"></div>
        </div>
        <motion.div
          variants={parentVariants}
          className="status__panel-text-wrapper"
        >
          <motion.div variants={parentVariants} className="section-header">
            <motion.h1 id="right-side-title" variants={itemVariants2}>
              Welcome User
            </motion.h1>
            <motion.p
              variants={errorVariants}
              className={status && errorStatus ? 'error-text' : 'closed'}
              animate={status && errorStatus ? 'open' : 'closed'}
            >
              *Please resolve all requirements
            </motion.p>
            <motion.div
              variants={itemVariants2}
              className="text-underscore"
            ></motion.div>
          </motion.div>
          {status ? (
            <>
              <motion.div variants={parentVariants} className="required-req">
                <motion.h2 variants={itemVariants2}>Email address</motion.h2>
                <ValidateField
                  content={'Must be a valid email address'}
                  status={emailReq.valid_email}
                />
              </motion.div>

              <motion.div variants={parentVariants} className="required-req">
                <motion.h2 variants={itemVariants2}>Password</motion.h2>
                <ValidateField
                  content={'At least 8 characters'}
                  status={passwordReq.least_chars}
                />
                <ValidateField
                  content={'Must contain a number'}
                  status={passwordReq.contain_number}
                />
                <ValidateField
                  content={'Must contain a letter'}
                  status={passwordReq.contain_letter}
                />
                <ValidateField
                  content={'Must contain a special character'}
                  status={passwordReq.contain_special_char}
                />
              </motion.div>
              <motion.div variants={parentVariants} className="required-req">
                <motion.h2 variants={itemVariants2}>Confirm Password</motion.h2>
                <ValidateField
                  content={'Same with password'}
                  status={confPasswordReq.same_with_password}
                />
              </motion.div>
            </>
          ) : (
            <motion.div className="nfc__logo-wrapper" variants={parentVariants}>
              <motion.img
                variants={itemVariants}
                className="nfc__logo-req"
                // src={}
                alt="black-web-logo"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ValidateSection;
