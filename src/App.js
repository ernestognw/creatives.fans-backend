import { Switch, Route } from "react-router";
import Landing from "@views/landing";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
    </Switch>
  );
};

export default App;
