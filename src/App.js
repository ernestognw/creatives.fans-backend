import { Switch, Route } from "react-router";
import Landing from "@views/landing";
import Creatives from "@views/creatives";
import Profile from "@views/profile";
import { routes } from "@config/constants";
import MainLayout from "@layouts/main";

const App = () => {
  return (
    <MainLayout>
      <Switch>
        <Route exact path={routes.INDEX} component={Landing} />
        <Route exact path={routes.CREATIVES} component={Creatives} />
        <Route path={routes.PROFILE.RECEIVED} component={Profile} />
      </Switch>
    </MainLayout>
  );
};

export default App;
