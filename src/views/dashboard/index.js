import { Route, Switch } from "react-router";
import { routes } from "@config/constants";
import Main from "./main";
import MyFans from "./my-fans";

const Dashboard = () => {
  return (
    <>
      <Switch>
        <Route exact path={routes.DASHBOARD.MAIN} component={Main} />
        <Route exact path={routes.DASHBOARD.MY_FANS} component={MyFans} />
      </Switch>
    </>
  );
};

export default Dashboard;
