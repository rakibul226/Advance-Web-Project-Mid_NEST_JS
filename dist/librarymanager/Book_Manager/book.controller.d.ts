import { BookService } from './book.service';
import { BookEntity } from './entity/book.entity';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    create(createBookDto: CreateBookDto): Promise<{
        message: string;
        book: BookEntity;
    }>;
    findAll(): Promise<BookEntity[]>;
    findOne(id: string): Promise<BookEntity | undefined>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<BookEntity | undefined>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
