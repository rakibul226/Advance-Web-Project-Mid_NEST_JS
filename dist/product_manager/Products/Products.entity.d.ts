import { CommentEntity } from './Comment.entity';
export declare class ProductpictureEntity {
    id: number;
    productname: string;
    filename: string;
}
export declare class Productentity {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    comments: CommentEntity[];
}
