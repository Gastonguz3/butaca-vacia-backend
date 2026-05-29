import { Role } from "generated/prisma/enums"

export class AuthResponseDto {

    accessToken: string

    refreshToken: string

    user: {
        id: string,
        email: string,
        username: string,
        role: Role
    }
}