import { appConfig } from '@dm/react/shared/util-config';
import { FormService } from '@dm/react/shared/util-store';
import { UserProfileDto } from '@dm/shared/demo/data-model';
import axios from 'axios';

const apiUrl = appConfig.apiUrl() + '/user';

export const userService: FormService<UserProfileDto> = {
  async loadResource(id) {
    const res = await axios.get<UserProfileDto>(`${apiUrl}/${id}`);
    return res.data;
  },
  async saveResource(user: UserProfileDto) {
    const res = await axios.put<UserProfileDto>(`${apiUrl}/${user.id}`, user);
    return res.data;
  },
};
