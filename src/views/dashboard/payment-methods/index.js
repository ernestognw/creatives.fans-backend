import { Route, Switch } from "react-router";
import { routes } from "@config/constants";
import Main from "./main";
import Add from "./add";

const PaymentMethods = () => {
  return (
    <>
      <Switch>
        <Route exact path={routes.DASHBOARD.PAYMENT_METHODS.MAIN} component={Main} />
        <Route
          exact
          path={routes.DASHBOARD.PAYMENT_METHODS.ADD}
          component={Add}
        />
      </Switch>
    </>
  );
};

export default PaymentMethods;
