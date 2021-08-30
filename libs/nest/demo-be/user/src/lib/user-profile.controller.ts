import { UserProfileDto } from '@dm/shared/demo/data-model';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileService } from './user-profile.service';

@UseGuards(AuthGuard())
@Controller('user')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get(':id')
  getUserProfile(@Param('id') id): Promise<UserProfileDto> {
    return this.userProfileService.getUserProfile(id);
  }

  @Delete(':id')
  deleteUserProfile(@Body() body, @Param('id') id) {
    return this.userProfileService.deleteUserProfile(id);
  }

  @Put(':id')
  updateUserProfile(@Body() userProfile: UserProfileDto): Promise<UserProfileDto> {
    return this.userProfileService.updateUserProfile({ userProfile });
  }

  @Post()
  createUserProfile(@Body() userProfile: UserProfileDto): Promise<UserProfileDto> {
    return this.userProfileService.createUserProfile({ userProfile });
  }
}
