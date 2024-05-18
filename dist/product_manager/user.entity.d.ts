import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: number;
    isActive: boolean;
    fullName: string;
    phone: number;
    setId(): void;
}
