import { ProjectDto } from '@dm/shared/demo/data-model';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './projects.entity';
import { ProjectRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(ProjectRepository) private readonly projectsRepository: ProjectRepository) {}

  async getResource(id: number, userId: number): Promise<ProjectDto> {
    const found = await this.projectsRepository.findOne({ where: { id, userId }, select: ['id', 'name', 'github'] });
    if (!found) throw new NotFoundException(`Projects with ID "${id}" not found.`);
    return found;
  }

  async createResource(project: ProjectDto, userId: number): Promise<ProjectDto> {
    let createdProject: ProjectEntity;
    try {
      createdProject = await this.projectsRepository.createProject({ ...project, userId });
    } catch (error) {
      throw new BadRequestException(error);
    }

    delete createdProject.userId;
    return createdProject;
  }

  async updateResource(project: ProjectDto, userId: number): Promise<ProjectDto> {
    if (!project.id) throw new Error('ID is required');

    const update: ProjectDto = { ...project };
    delete update.id;

    try {
      await this.projectsRepository.update({ id: project.id, userId }, update);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return { id: project.id, ...project };
  }

  async deleteResource(id: number, userId: number): Promise<ProjectDto> {
    if (!id) throw new Error('ID is required');

    const project = await this.projectsRepository.findOne({ where: { id, userId } });
    try {
      const deleteRes = await project.remove();
      return deleteRes;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getResources(userId: number): Promise<ProjectDto[]> {
    const resources = await this.projectsRepository.find({
      where: { userId },
      select: ['id', 'name', 'github'],
    });
    return resources;
  }
}
