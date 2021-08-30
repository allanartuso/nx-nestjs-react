import { UserProfileDto } from '@dm/shared/demo/data-model';
import { EntityRepository, Repository } from 'typeorm';
import { UserProfileEntity } from './user-profile.entity';

@EntityRepository(UserProfileEntity)
export class UserProfileRepository extends Repository<UserProfileEntity> {
  async createUserProfile(userProfileDto: UserProfileDto): Promise<UserProfileEntity> {
    const userProfile = new UserProfileEntity();

    for (const key of Object.keys(userProfileDto)) {
      userProfile[key] = userProfileDto[key];
    }

    await userProfile.save();

    return userProfile;
  }
}
