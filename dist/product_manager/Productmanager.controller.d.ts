import { ProductmanagerService } from './Productmanager.service';
import { ChangePasswordDto, LoginDTO, UpdateProfileDTO } from './Productmanager.dto';
import { RegistrationDTO } from './Productmanager.dto';
import { ProductmanagerEntity } from './Productmanager.entity';
export declare class ProductmanagerController {
    private readonly ProductmanagerService;
    constructor(ProductmanagerService: ProductmanagerService);
    register(registrationDTO: RegistrationDTO): Promise<ProductmanagerEntity>;
    login(LoginDTO: LoginDTO): Promise<{
        message: string;
    }>;
    changePassword(changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    getAllUsers(): Promise<ProductmanagerEntity[]>;
    findOne(id: string): Promise<ProductmanagerEntity | undefined>;
    update(id: string, updateuserDto: UpdateProfileDTO): Promise<ProductmanagerEntity | undefined>;
}
