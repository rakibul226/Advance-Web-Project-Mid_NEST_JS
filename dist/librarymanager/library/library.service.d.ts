import { Repository } from 'typeorm';
import { RegistrationEntity } from './Entity/registration.entity';
import { RegistrationDTO } from './DTO/registration.dto';
export declare class LibraryService {
    private libraryRepo;
    constructor(libraryRepo: Repository<RegistrationEntity>);
    registration(registrationDTO: RegistrationDTO): Promise<RegistrationEntity[]>;
    login(email: string, password: string): Promise<RegistrationEntity | null>;
}
