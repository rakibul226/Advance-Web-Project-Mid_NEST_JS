import { Repository } from 'typeorm';
import { BookEntity } from './entity/book.entity';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
export declare class BookService {
    private readonly bookRepository;
    constructor(bookRepository: Repository<BookEntity>);
    create(createBookDto: CreateBookDto): Promise<BookEntity>;
    findAll(): Promise<BookEntity[]>;
    findOne(id: number): Promise<BookEntity | undefined>;
    update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity | undefined>;
    remove(id: number): Promise<void>;
}
