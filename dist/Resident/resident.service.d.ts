import { AllProductEntity, BookEntity, MyBookEntity, MyProductEntity, ResidentEntity } from './ENTITY/resident.entity';
import { BuyProductDTO, registrationDTO } from './DTO/resident.dto';
import { Repository } from 'typeorm';
export declare class ResidentService {
    private residentRepo;
    private bookRepo;
    private myBookRepo;
    private allProductRepo;
    private myProductRepo;
    constructor(residentRepo: Repository<ResidentEntity>, bookRepo: Repository<BookEntity>, myBookRepo: Repository<MyBookEntity>, allProductRepo: Repository<AllProductEntity>, myProductRepo: Repository<MyProductEntity>);
    registration(registrationDTO: registrationDTO): Promise<ResidentEntity[]>;
    login(email: string, password: string): Promise<ResidentEntity>;
    borrowBook(bookName: string): Promise<string>;
    findByName(name: string): Promise<string>;
    viewAllBooks(): Promise<BookEntity[] | string>;
    viewMyBooks(): Promise<MyBookEntity[] | string>;
    deleteBookByName(name: string): Promise<string>;
    buyProduct(buyProductDto: BuyProductDTO): Promise<{
        message: string;
        myProduct: MyProductEntity;
    }>;
    updateProduct(productName: string, quantity: number): Promise<{
        message: string;
    }>;
    viewAllProduct(): Promise<AllProductEntity[] | string>;
    viewBoughtProduct(): Promise<MyProductEntity[] | string>;
    cancelOrder(productName: string): Promise<string>;
}
