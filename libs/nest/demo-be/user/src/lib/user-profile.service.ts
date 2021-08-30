import { AuthService } from '@dm/nest/shared/auth';
import { UserProfileDto } from '@dm/shared/demo/data-model';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfileEntity } from './user-profile.entity';
import { UserProfileRepository } from './user-profile.repository';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfileRepository) private readonly userProfileRepository: UserProfileRepository,
    private readonly authService: AuthService
  ) {
    this.listenNewUsers();
  }

  private listenNewUsers() {
    this.authService.userCreated$.subscribe((user) => {
      this.createUserProfile({
        userProfile: {
          id: user.id,
          email: user.username,
        },
      });
    });
  }

  async getUserProfile(id: number): Promise<UserProfileEntity> {
    const found = await this.userProfileRepository.findOne(id);
    if (!found) throw new NotFoundException(`UserProfile with ID "${id}" not found.`);
    return found;
  }

  async createUserProfile({ userProfile }: { userProfile: UserProfileDto }): Promise<UserProfileDto> {
    // if (userProfile.id) throw new BadRequestException('ID must be null when adding items');

    try {
      userProfile = await this.userProfileRepository.createUserProfile(userProfile);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return userProfile;
  }

  async updateUserProfile({ userProfile }: { userProfile: UserProfileDto }) {
    if (!userProfile.id) throw new Error('ID is required');

    const update: UserProfileDto = { ...userProfile };
    delete update.id;

    try {
      await this.userProfileRepository.update(userProfile.id, update);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return userProfile;
  }

  async deleteUserProfile(userProfileId: number) {
    if (!userProfileId) throw new Error('ID is required');

    const userProfile = await this.getUserProfile(userProfileId);

    try {
      const deleteRes = await userProfile.remove();
      return { deleteRes };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
