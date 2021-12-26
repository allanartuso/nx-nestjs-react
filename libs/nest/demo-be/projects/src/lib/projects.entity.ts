import { ProjectDto } from '@dm/shared/demo/data-model';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements ProjectDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column()
  private: boolean;

  @Column({
    nullable: true,
  })
  github: string;
}
