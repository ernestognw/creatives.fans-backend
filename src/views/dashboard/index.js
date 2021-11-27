import { Route, Switch } from "react-router";
import { routes } from "@config/constants";
import Main from "./main";
import MyFans from "./my-fans";
import EditProfile from "./edit-profile";

const Dashboard = () => {
  return (
    <>
      <Switch>
        <Route exact path={routes.DASHBOARD.MAIN} component={Main} />
        <Route exact path={routes.DASHBOARD.MY_FANS} component={MyFans} />
        <Route
          exact
          path={routes.DASHBOARD.EDIT_PROFILE}
          component={EditProfile}
        />
      </Switch>
    </>
  );
};

export default Dashboard;
