import { ProductmanagerEntity } from './Productmanager.entity';
import { RegistrationDTO } from './Productmanager.dto';
import { Repository } from 'typeorm';
import { ChangePasswordDto, UpdateProfileDTO } from './Productmanager.dto';
export declare class ProductmanagerService {
    private ProductmanagerRepo;
    constructor(ProductmanagerRepo: Repository<ProductmanagerEntity>);
    register(registrationDTO: RegistrationDTO): Promise<ProductmanagerEntity>;
    hashPassword(password: string): Promise<string>;
    verifyPassword(providedPassword: string, storedHash: string): Promise<boolean>;
    login(email: string, password: string): Promise<ProductmanagerEntity | null>;
    changePassword(email: string, changePasswordDto: ChangePasswordDto): Promise<void>;
    getAllUsers(): Promise<ProductmanagerEntity[]>;
    findOne(id: number): Promise<ProductmanagerEntity | undefined>;
    update(id: number, updateprofileDTO: UpdateProfileDTO): Promise<ProductmanagerEntity | undefined>;
}
