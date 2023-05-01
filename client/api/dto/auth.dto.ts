export interface LoginFormDTO {
    email: string
    password: string
}

export interface LoginResponseDTO {
    token: string
}

export interface User {
    id: number
    email: string
    fullName: string
}

export type RegisterFormDTO = LoginFormDTO & { fullName: string };
export type RegisterResponseDto = LoginResponseDTO