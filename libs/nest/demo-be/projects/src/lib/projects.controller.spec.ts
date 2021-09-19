import { Test } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ProjectsService],
      controllers: [ProjectsController],
    }).compile();

    controller = module.get(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
