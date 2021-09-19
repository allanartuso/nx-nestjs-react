import { getReducerManager } from '@dm/react/shared/util-store';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { formActions } from './+state/project.actions';
import { projectReducer, PROJECT_FEATURE_KEY } from './+state/project.reducer';
import { CreateProject } from './containers/create-project/create-project';
import { Project } from './containers/project/project';
import { Projects } from './containers/projects/projects';
import './react-demo-fe-feature-projects.module.scss';

const reducerManager = getReducerManager();
const reducers = reducerManager.getReducerKeys();
if (!reducers.includes(PROJECT_FEATURE_KEY)) {
  reducerManager.add(PROJECT_FEATURE_KEY, projectReducer);
}

export function ReactDemoFeFeatureProjects() {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  dispatch(formActions.reset());

  return (
    <Switch>
      <Route path={`${match.path}/create`}>
        <CreateProject />
      </Route>
      <Route path={`${match.path}/:id`}>
        <Project />
      </Route>
      <Route path={`${match.path}/`}>
        <Projects />
      </Route>
    </Switch>
  );
}

export default ReactDemoFeFeatureProjects;
