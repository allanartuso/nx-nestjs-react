import { createFormActions } from '@dm/react/shared/util-store';
import { projectService } from '../services/project.service';

export const formActions = createFormActions('Project', projectService);
