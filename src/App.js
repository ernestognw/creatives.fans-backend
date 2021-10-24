import { Switch, Route } from "react-router";
import Landing from "@views/landing";
import Creatives from "@views/creatives";
import { routes } from "@config/constants";
import MainLayout from "@layouts/main";

const App = () => {
  return (
    <MainLayout>
      <Switch>
        <Route exact path={routes.INDEX} component={Landing} />
        <Route exact path={routes.CREATIVES} component={Creatives} />
      </Switch>
    </MainLayout>
  );
};

export default App;
