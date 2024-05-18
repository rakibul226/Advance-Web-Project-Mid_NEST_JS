export declare class CreateProductDTO {
    name: string;
    description: string;
    price: number;
    quantity: number;
}
export declare class UpdateProductDTO extends CreateProductDTO {
    id: number;
}
export declare class DeleteProductDTO {
    id: number;
}
export declare class ProductpictureDTO {
    id: number;
    productname: string;
    filename: string;
}
export declare class PostCommentDTO {
    content: string;
}
