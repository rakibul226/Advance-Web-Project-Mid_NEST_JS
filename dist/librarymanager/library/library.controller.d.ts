import { LibraryService } from './library.service';
import { LoginDtO, RegistrationDTO } from './DTO/registration.dto';
export declare class LibraryController {
    private readonly libraryService;
    constructor(libraryService: LibraryService);
    registration(registrationDTO: RegistrationDTO): any;
    login(loginDtO: LoginDtO): Promise<{
        message: string;
    }>;
}
