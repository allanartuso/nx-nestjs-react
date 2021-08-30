import { getReducerManager } from '@dm/react/shared/util-store';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { formActions } from './+state/user.actions';
import { userReducer, USER_FEATURE_KEY } from './+state/user.reducer';
import { UserProfile } from './containers/user-profile/user-profile';
import './react-demo-fe-feature-user.module.scss';

/* eslint-disable-next-line */
export interface ReactDemoBeFeatureUserProps {}

const reducerManager = getReducerManager();
const reducers = reducerManager.getReducerKeys();
if (!reducers.includes(USER_FEATURE_KEY)) {
  reducerManager.add(USER_FEATURE_KEY, userReducer);
}

export function ReactDemoBeFeatureUser(props: ReactDemoBeFeatureUserProps) {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  dispatch(formActions.reset());

  return (
    <Switch>
      <Route path={`${match.path}/profile`}>
        <UserProfile />
      </Route>
    </Switch>
  );
}

export default ReactDemoBeFeatureUser;
