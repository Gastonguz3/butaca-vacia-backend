import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(3, 25)
  username?: string;

}