import { Test } from '@nestjs/testing';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ProjectsService],
    }).compile();

    service = module.get(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
