import urljoin from "url-join";

const env = {
  development: process.env.NODE_ENV === "development",
  test: process.env.NODE_ENV === "test",
  staging: process.env.NODE_ENV === "staging",
  production: process.env.NODE_ENV === "production",
};

const apiUrl = urljoin(process.env.REACT_APP_API_URL, "graphql");
const authUrl = urljoin(process.env.REACT_APP_API_URL, "auth");

const google = {
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
};

const facebook = {
  appId: process.env.REACT_APP_FACEBOOK_APP_ID,
};

export { env, apiUrl, authUrl, google, facebook };
