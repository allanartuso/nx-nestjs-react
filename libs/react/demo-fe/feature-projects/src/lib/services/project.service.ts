import { appConfig } from '@dm/react/shared/util-config';
import { FormService } from '@dm/react/shared/util-store';
import { ProjectDto } from '@dm/shared/demo/data-model';
import axios from 'axios';

const apiUrl = appConfig.apiUrl() + '/projects';

export const projectService: FormService<ProjectDto> = {
  async loadResource(id) {
    const res = await axios.get<ProjectDto>(`${apiUrl}/${id}`);
    return res.data;
  },
  async saveResource(resource: ProjectDto) {
    const res = await axios.put<ProjectDto>(`${apiUrl}/${resource.id}`, resource);
    return res.data;
  },
  async createResource(resource: ProjectDto) {
    const res = await axios.post<ProjectDto>(`${apiUrl}`, resource);
    return res.data;
  },
};
