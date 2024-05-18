export declare class LoginDTO {
    email: string;
    password: string;
}
export declare class RegistrationDTO {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: string;
}
export declare class ChangePasswordDto {
    email: string;
    readonly currentPassword: string;
    readonly newPassword: string;
}
export declare class UpdateProfileDTO {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: string;
}
