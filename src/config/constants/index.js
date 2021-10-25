const routes = {
  INDEX: "/",
  CREATIVES: "/creatives",
  PROFILE: {
    RECEIVED: '/@:username',
    SENT: '/@:username/sent',
  }
};

const profileImgFallback =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReDYDCobDGmhjOJGUSmVwnZfMjfgA0EMepboIRAhyp64fAxW3_Mw7LTvCj9U0VauWrv3Q&usqp=CAU";

export { routes, profileImgFallback };
