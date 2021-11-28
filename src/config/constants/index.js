const routes = {
  INDEX: "/",
  CREATIVES: "/creatives",
  PROFILE: {
    RECEIVED: "/@:username",
    SENT: "/@:username/sent",
  },
  DASHBOARD: {
    MAIN: "/dashboard",
    MY_FANS: "/dashboard/my-fans",
    EDIT_PROFILE: "/dashboard/edit-profile",
    PAYMENT_METHODS: {
      MAIN: "/dashboard/payment-methods",
      ADD: "/dashboard/payment-methods/add",
    },
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

const sortOrders = {
  asc: "asc",
  desc: "desc",
};

export { routes, social, sortOrders };
