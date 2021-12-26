import { ProjectDto } from '@dm/shared/demo/data-model';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto implements ProjectDto {
  @IsString()
  @IsOptional()
  @MaxLength(120)
  github: string;

  @IsString()
  @MaxLength(120)
  name: string;

  @IsBoolean()
  private: boolean;
}

export class UpdateProjectDto implements ProjectDto {
  @IsString()
  id: number;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  github: string;

  @IsString()
  @MaxLength(120)
  name: string;

  @IsBoolean()
  private: boolean;
}
