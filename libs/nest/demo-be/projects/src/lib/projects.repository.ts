import { EntityRepository, Repository } from 'typeorm';
import { ProjectEntity } from './projects.entity';

@EntityRepository(ProjectEntity)
export class ProjectRepository extends Repository<ProjectEntity> {
  async createProject(projectDto: Partial<ProjectEntity>): Promise<ProjectEntity> {
    const resource = new ProjectEntity();

    for (const key of Object.keys(projectDto)) {
      resource[key] = projectDto[key];
    }

    await resource.save();

    return resource;
  }
}
