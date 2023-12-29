import { createContext, useContext, useState } from 'react';

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  setCurrentUser: () => {},
  setUserToken: () => {},
  firstIn: false,
  setFirstIn: () => {},
  fetchingUser: true,
  setFetchingUser: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(
    localStorage.getItem('TOKEN') || ''
  );
  const [firstIn, setFirstIn] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('TOKEN', token);
    } else {
      localStorage.removeItem('TOKEN');
    }
    _setUserToken(token);
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        firstIn,
        setFirstIn,
        fetchingUser,
        setFetchingUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const userStateContext = () => useContext(StateContext);
