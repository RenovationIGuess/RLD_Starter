import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '~/axios';
import { userStateContext } from '~/contexts/ContextProvider';

const GithubAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.search;

  const { setUserToken, setFirstIn } = userStateContext();

  useEffect(() => {
    axiosClient
      .get(`/auth/github/callback${searchParams}`)
      .then(({ data }) => {
        // console.log(data);
        setUserToken(data.token);
        setFirstIn(true);
        navigate('/');
      })
      .catch((err) => console.error(err));
  }, []);

  return <></>;
};

export default GithubAuth;
