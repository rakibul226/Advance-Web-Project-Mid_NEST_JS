import { Productentity, ProductpictureEntity } from './Products.entity';
import { CommentEntity } from './Comment.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO, UpdateProductDTO, PostCommentDTO } from './Products.dto';
export declare class ProductService {
    private commentRepo;
    private productpicRepo;
    private productRepo;
    constructor(commentRepo: Repository<CommentEntity>, productpicRepo: Repository<ProductpictureEntity>, productRepo: Repository<Productentity>);
    create(createproductDTO: CreateProductDTO): Promise<Productentity>;
    getAllUsers(): Promise<Productentity[]>;
    findOne(id: number): Promise<Productentity | undefined>;
    update(id: number, updateproductDTO: UpdateProductDTO): Promise<Productentity | undefined>;
    remove(id: number): Promise<void>;
    addEvent(myobj: ProductpictureEntity): Promise<ProductpictureEntity>;
    addCommentToProduct(productId: number, commentDto: PostCommentDTO): Promise<CommentEntity>;
}
