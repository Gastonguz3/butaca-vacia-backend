import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {

  @IsString()
  @IsNotEmpty({ message: 'La contraseña actual es obligatoria' })
  currentPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'La nueva contraseña es obligatoria' })
  @MinLength(8, { message: 'La nueva contraseña debe contener al menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message:'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'}
  )
  newPassword: string;
}