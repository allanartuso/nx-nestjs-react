import { createFormSelectors, PartialFormState } from '@dm/react/shared/util-store';
import { ProjectDto } from '@dm/shared/demo/data-model';
import { PROJECT_FEATURE_KEY } from './project.reducer';

const selectState = (state: PartialFormState<ProjectDto>) => state[PROJECT_FEATURE_KEY];

export const formSelectors = createFormSelectors(selectState);
