const routes = {
  INDEX: "/",
  CREATIVES: "/creatives",
  PROFILE: {
    RECEIVED: "/@:username",
    SENT: "/@:username/sent",
  },
};

const social = {
  instagram: {
    color: "#c32aa3",
    url: (username) => `https://instagram.com/${username}`,
  },
  facebook: {
    color: "#1877f2",
    url: (username) => `https://facebook.com/${username}`,
  },
  twitter: {
    color: "#1da1f2",
    url: (username) => `https://twitter.com/${username}`,
  },
  website: {
    color: "green",
  },
};

export { routes, social };
