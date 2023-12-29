import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { userStateContext } from '~/contexts/ContextProvider';

const GuestLayout = () => {
  const { userToken } = userStateContext();

  if (userToken) {
    return <Navigate to="/profile/private" />;
  }

  return (
    <>
      <Navbar isLogin={true} />
      <Outlet />
    </>
  );
};

export default GuestLayout;
