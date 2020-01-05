import React, { useContext, useEffect, useState } from "react";
import { authService } from "./AuthService";
import LoadingIndicator from "../LoadingIndicator";
import { Auth, CurrentUser, AuthParams } from "./authTypes";
import Axios from "axios";

export const AuthContext = React.createContext<Auth>({
  signIn: () => null,
  signOut: () => null
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface ProvideAuthProps {
  children: React.ReactNode;
}

export function ProvideAuth(props: ProvideAuthProps) {
  const { Provider } = AuthContext;
  const { ...auth } = useProvideAuth();
  return (
    <LoadingIndicator promise={auth.promise}>
      <Provider value={auth}>{props.children}</Provider>
    </LoadingIndicator>
  );
}

export function useProvideAuth() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [promise, setPromise] = useState<Promise<any> | undefined>();

  const signIn = (params?: AuthParams) => {
    authService.SignIn(params).then(r => {
      setPromise(
        authService.GetCurrentUser().then(r => {
          setCurrentUser(r.result);
        })
      );
    });
  };

  const signOut = () => {
    setPromise(authService.SignOut());
    setCurrentUser(undefined);
  };

  useEffect(() => {
    Axios.interceptors.response.use(
      res => res,
      error => {
        if (error.response.status === 401) {
          setCurrentUser(undefined);
        }
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    );
  }, []);

  useEffect(() => {
    setPromise(
      authService.GetCurrentUser().then(user => {
        setCurrentUser(user.result);
      })
    );
  }, []);

  return { currentUser, signIn, signOut, promise };
}
