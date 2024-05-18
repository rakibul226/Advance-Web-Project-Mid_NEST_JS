"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Products_entity_1 = require("./Products.entity");
const Comment_entity_1 = require("./Comment.entity");
const typeorm_2 = require("typeorm");
const common_2 = require("@nestjs/common");
let ProductService = class ProductService {
    constructor(commentRepo, productpicRepo, productRepo) {
        this.commentRepo = commentRepo;
        this.productpicRepo = productpicRepo;
        this.productRepo = productRepo;
    }
    async create(createproductDTO) {
        return this.productRepo.save(createproductDTO);
    }
    async getAllUsers() {
        return this.productRepo.find();
    }
    async findOne(id) {
        return await this.productRepo.findOne({ where: { id } });
    }
    async update(id, updateproductDTO) {
        await this.productRepo.update(id, updateproductDTO);
        return this.findOne(id);
    }
    async remove(id) {
        await this.productRepo.delete(id);
    }
    async addEvent(myobj) {
        return await this.productpicRepo.save(myobj);
    }
    async addCommentToProduct(productId, commentDto) {
        const product = await this.productRepo.findOne({ where: { id: productId } });
        if (!product) {
            throw new common_2.NotFoundException(`Product with ID ${productId} not found`);
        }
        const comment = new Comment_entity_1.CommentEntity();
        comment.content = commentDto.content;
        comment.product = product;
        return await this.commentRepo.save(comment);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Comment_entity_1.CommentEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(Products_entity_1.ProductpictureEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(Products_entity_1.Productentity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=Products.service.js.map