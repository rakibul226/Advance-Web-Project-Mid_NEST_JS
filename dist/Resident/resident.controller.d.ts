import { ResidentService } from './resident.service';
import { BuyProductDTO, LoginDTO, SearchDTO, UpdateProductDTO, borrowBookDTO, registrationDTO } from './DTO/resident.dto';
import { AllProductEntity, BookEntity, MyBookEntity, MyProductEntity } from './ENTITY/resident.entity';
export declare class residentController {
    private readonly residentService;
    constructor(residentService: ResidentService);
    registration(registrationDTO: registrationDTO): any;
    login(LoginDTO: LoginDTO): Promise<{
        message: string;
    }>;
    borrowBook(borrowBookDTO: borrowBookDTO): Promise<string>;
    findBookByName(searchDTO: SearchDTO): Promise<string>;
    viewAllBooks(): Promise<BookEntity[] | string>;
    viewMyBooks(): Promise<MyBookEntity[] | string>;
    deleteBookByName(name: string): Promise<string>;
    buyProduct(buyProductDto: BuyProductDTO): Promise<{
        message: string;
        myProduct: MyProductEntity;
    }>;
    updateProduct(updateProductDto: UpdateProductDTO): Promise<{
        message: string;
    }>;
    viewAllProduct(): Promise<AllProductEntity[] | string>;
    viewBoughtProduct(): Promise<MyProductEntity[] | string>;
    cancelOrder(name: string): Promise<string>;
}
