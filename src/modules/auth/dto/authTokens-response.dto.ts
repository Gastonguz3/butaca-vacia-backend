import { Role } from 'generated/prisma/enums';

export class AuthTokensResponseDto {

  accessToken: string;

  refreshToken: string;

  user: {
    id: string;
    email: string;
    username: string;
    role: Role;
  };
}
