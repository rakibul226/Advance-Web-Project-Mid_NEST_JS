/// <reference types="multer" />
import { ProductService } from './Products.service';
import { CommentEntity } from './Comment.entity';
import { Productentity } from './Products.entity';
import { CreateProductDTO, UpdateProductDTO, ProductpictureDTO, PostCommentDTO } from './Products.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createproductDTO: CreateProductDTO): Promise<{
        message: string;
        product: Productentity;
    }>;
    getAllUsers(): Promise<Productentity[]>;
    findOne(id: string): Promise<Productentity | undefined>;
    update(id: string, updateproductDto: UpdateProductDTO): Promise<Productentity | undefined>;
    remove(id: string): Promise<{
        message: string;
    }>;
    addEvent(myobj: ProductpictureDTO, myfile: Express.Multer.File): Promise<ProductpictureDTO>;
    addCommentToProduct(productId: number, commentDto: PostCommentDTO): Promise<CommentEntity>;
}
