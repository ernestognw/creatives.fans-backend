import { Switch, Route, Redirect } from "react-router";
import Landing from "@views/landing";
import Creatives from "@views/creatives";
import Profile from "@views/profile";
import Dashboard from "@views/dashboard";
import { routes } from "@config/constants";
import MainLayout from "@layouts/main";
import { useUser } from "@providers/user";

const App = () => {
  const { isLogged, token } = useUser();

  return (
    <MainLayout>
      <Switch>
        <Route exact path={routes.INDEX} component={Landing} />
        <Route exact path={routes.CREATIVES} component={Creatives} />
        <Route path={routes.PROFILE.RECEIVED} component={Profile} />
        {isLogged && (
          <Route path={routes.DASHBOARD.MAIN} component={Dashboard} />
        )}
        {!token && <Redirect to={routes.INDEX} />}
      </Switch>
    </MainLayout>
  );
};

export default App;
