import { UserProfileDto } from '@dm/shared/demo/data-model';
import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'user-profile' })
@Unique(['id', 'email'])
export class UserProfileEntity extends BaseEntity implements UserProfileDto {
  @PrimaryColumn()
  id: number;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  name: string;
}
