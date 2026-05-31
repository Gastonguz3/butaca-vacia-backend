import { Request } from 'express';
import { Role } from 'generated/prisma/enums';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    username: string;
    role: Role;
  };
}