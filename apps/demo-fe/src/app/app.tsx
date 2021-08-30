import {
  authActions,
  authReducer,
  AUTH_FEATURE_KEY,
  AUTH_ROUTE_PATH,
  ProtectedRoute,
  ReactSharedFeatureAuth,
} from '@dm/react/shared/feature-auth';
import { configureDmStore } from '@dm/react/shared/util-store';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import styles from './app.module.scss';
import ButtonAppBar from './components/appBar';
import { appReducer } from './store';

const ReactDemoBeFeatureUser = React.lazy(() =>
  import('@dm/react/demo-fe/feature-user').then((module) => ({ default: module.ReactDemoBeFeatureUser }))
);

const history = createBrowserHistory();
const store = configureDmStore({ appReducer, [AUTH_FEATURE_KEY]: authReducer }, history);

export function App() {
  useEffect(() => {
    store.dispatch(authActions.initialize());
  });

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className={styles.app}>
          <ButtonAppBar />
          <div className={styles.content}>
            <Switch>
              <Route path="/" exact render={() => <div>Welcome home</div>} />
              <Route path={`/${AUTH_ROUTE_PATH}`}>
                <ReactSharedFeatureAuth />
              </Route>
              <React.Suspense fallback={<p>Loading</p>}>
                <ProtectedRoute path="/user">
                  <ReactDemoBeFeatureUser />
                </ProtectedRoute>
              </React.Suspense>
            </Switch>
          </div>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
