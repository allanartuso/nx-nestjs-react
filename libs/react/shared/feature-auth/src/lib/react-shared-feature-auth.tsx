import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ChangePassword from './components/change-password/change-password';
import ResetPassword from './components/reset-password/reset-password';
import { SignInUp } from './components/sign-in-up/sign-in-up';

/* eslint-disable-next-line */
export interface ReactSharedFeatureAuthProps {}

export function ReactSharedFeatureAuth(props: ReactSharedFeatureAuthProps) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/login`}>
        <SignInUp />
      </Route>
      <Route path={`${match.path}/reset-password`}>
        <ResetPassword />
      </Route>
      <Route path={`${match.path}/change-password`}>
        <ChangePassword />
      </Route>
      <Route path={match.path}>
        <h3>Please select a topic.</h3>
      </Route>
    </Switch>
  );
}

export default ReactSharedFeatureAuth;
