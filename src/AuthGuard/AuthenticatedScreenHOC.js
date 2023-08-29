import React from 'react';
import { useAuth } from './AuthContext';
import LoginScreen from '../login/login';

const AuthenticatedScreenHOC = (ScreenComponent) => {
  return (props) => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
      return <ScreenComponent {...props} />;
    } else {
      return <LoginScreen />;
    }
  };
};

export default AuthenticatedScreenHOC;