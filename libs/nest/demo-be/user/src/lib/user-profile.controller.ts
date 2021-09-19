import { UserProfileDto } from '@dm/shared/demo/data-model';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileService } from './user-profile.service';

@UseGuards(AuthGuard())
@Controller('user')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get(':id')
  get(@Param('id') id): Promise<UserProfileDto> {
    return this.userProfileService.get(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userProfileService.delete(id);
  }

  @Put(':id')
  update(@Body() userProfile: UserProfileDto): Promise<UserProfileDto> {
    return this.userProfileService.update(userProfile);
  }

  @Post()
  create(@Body() userProfile: UserProfileDto): Promise<UserProfileDto> {
    return this.userProfileService.create(userProfile);
  }
}
