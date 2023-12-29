import React, { useEffect, useState } from 'react';
import axiosClient from '../axios';
import { userStateContext } from '../contexts/ContextProvider';

const SignIn = () => {
  const { setUserToken, setFirstIn } = userStateContext();

  // Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  useEffect(() => {
    document.title = 'Sign In | Sign Up';
  }, []);

  useEffect(() => {
    const keyDownHandler = (event) => {
      // console.log("User pressed: ", event.key);

      if (event.key === 'Enter') {
        event.preventDefault();

        // 👇️ your logic here
        if (passwordConfirmation) handleSignUp();
        else handleSignIn();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [email, password, passwordConfirmation]);

  const handleSignIn = () => {
    setLoading(true);
    axiosClient
      .post('/auth/signin', {
        email,
        password,
      })
      .then(({ data }) => {
        setUserToken(data.token);
        setFirstIn(true);
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          // Handle errors here
        }
      })
      .finally(() => setLoading(false));
  };

  const handleSignUp = () => {
    setLoading(true);
    axiosClient
      .post('/auth/signup', {
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then(({ data }) => {
        setFirstIn(true);
        setUserToken(data.token);
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          // Handle errors here
        }
      })
      .finally(() => setLoading(false));
  };

  return <>{/* Implement here */}</>;
};

export default SignIn;
