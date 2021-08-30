import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { authSelectors } from './+state/auth.selectors';
import { AUTH_ROUTE_PATH } from './model/auth.model';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  path: string;
}

export function ProtectedRoute({ children, ...rest }: ProtectedRouteProps) {
  const history = useHistory();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const isInitialized = useSelector(authSelectors.getIsInitialized);

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      history.push(`/${AUTH_ROUTE_PATH}/login`, { from: history.location });
    }
  }, [isInitialized, isLoggedIn, history]);

  return <Route {...rest}>{children}</Route>;
}
