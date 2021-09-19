import { createFormReducer } from '@dm/react/shared/util-store';
import { formActions } from './project.actions';

export const PROJECT_FEATURE_KEY = 'project';

export const projectReducer = createFormReducer(formActions);
