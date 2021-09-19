import { GetUserPayload, JwtPayload } from '@dm/nest/shared/auth';
import { ProjectDto } from '@dm/shared/demo/data-model';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';

// TODO: validate if the user is the project's owner
@UseGuards(AuthGuard())
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get(':id')
  getResource(@GetUserPayload() userPayload: JwtPayload, @Param('id') id): Promise<ProjectDto> {
    return this.projectsService.getResource(id, userPayload.id);
  }

  @Delete(':id')
  deleteResource(@GetUserPayload() userPayload: JwtPayload, @Param('id') id: number) {
    return this.projectsService.deleteResource(id, userPayload.id);
  }

  @Put(':id')
  updateResource(@GetUserPayload() userPayload: JwtPayload, @Body() project: ProjectDto): Promise<ProjectDto> {
    return this.projectsService.updateResource(project, userPayload.id);
  }

  @Post()
  createResource(@GetUserPayload() userPayload: JwtPayload, @Body() project: ProjectDto): Promise<ProjectDto> {
    return this.projectsService.createResource(project, userPayload.id);
  }

  @Get()
  getResources(@GetUserPayload() userPayload: JwtPayload): Promise<ProjectDto[]> {
    return this.projectsService.getResources(userPayload.id);
  }
}
