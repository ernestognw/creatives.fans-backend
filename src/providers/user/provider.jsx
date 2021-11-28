import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import decode from "jwt-decode";
import { useQuery, useApolloClient } from "@apollo/client";
import PropTypes from "prop-types";
import { accessToken, client } from "@utils/auth";
import cookies from "react-cookies";
import useInterval from "@hooks/use-interval";
import { GET_USER } from "./requests";

const userContext = createContext({});

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(accessToken.get());
  const [isLogged, setIsLogged] = useState(!!cookies.load("session"));

  const { username } = useMemo(() => (token ? decode(token) : {}), [token]);
  const apolloClient = useApolloClient();

  const logoutWindow = useCallback(async () => {
    setToken();
    setIsLogged(false);
    await apolloClient.clearStore();
    accessToken.set();
  }, [apolloClient]);

  const logout = async () => {
    logoutWindow();
    await client.post("/logout");

    // Force logout on every tab
    localStorage.setItem("logout", Date.now());
  };

  const getAccessToken = async () => {
    try {
      if (isLogged) {
        const { data } = await client.get("/access");

        console.log(data.accessToken)
        accessToken.set(data.accessToken);
        setToken(data.accessToken);
      }
    } catch (err) {
      logout();
    }
  };

  useInterval(
    getAccessToken,
    1000 * 60 * 10, // 10 Minutes (5 mins less than access expiration)
    {
      skip: !isLogged,
      leading: true,
    }
  );

  useEffect(() => {
    // Listen when other tab logs out so every single tab returns to login
    const logoutListener = async (event) => {
      if (event.key === "logout") logoutWindow();
    };

    window.addEventListener("storage", logoutListener);

    return () => window.removeEventListener("storage", logoutListener);
  }, [logoutWindow]);

  const { data, loading, refetch } = useQuery(GET_USER, { skip: !token });

  const reloadUser = async () => {
    await getAccessToken();
    await refetch();
  };

  return (
    <userContext.Provider
      value={{
        isLogged,
        setIsLogged,
        token,
        logout,
        user: data?.userByToken ? { ...data.userByToken } : { username },
        loadingUser: loading,
        reloadUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { userContext };
export default UserProvider;
