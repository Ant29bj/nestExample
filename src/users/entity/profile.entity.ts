import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profile_user' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  age: number;
}
