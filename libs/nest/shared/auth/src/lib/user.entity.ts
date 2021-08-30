import * as bcrypt from 'bcrypt';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'user-auth' })
@Unique('USERNAME_PER_APP', ['appId', 'username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appId: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ nullable: true, type: 'timestamp' })
  firstLogin: Date;

  @Column({ default: false })
  forceResetPassword: boolean;

  @Column({ nullable: true })
  resetPasswordCode: string;

  @Column({ nullable: true })
  requestCodeDate: Date;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ nullable: true })
  invitedBy: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  async validateResetPasswordCode(code: string): Promise<boolean> {
    const hash = await bcrypt.hash(code, this.salt);
    return hash === this.resetPasswordCode;
  }
}
