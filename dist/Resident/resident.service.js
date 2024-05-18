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
exports.ResidentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const resident_entity_1 = require("./ENTITY/resident.entity");
const typeorm_2 = require("typeorm");
let ResidentService = class ResidentService {
    constructor(residentRepo, bookRepo, myBookRepo, allProductRepo, myProductRepo) {
        this.residentRepo = residentRepo;
        this.bookRepo = bookRepo;
        this.myBookRepo = myBookRepo;
        this.allProductRepo = allProductRepo;
        this.myProductRepo = myProductRepo;
    }
    async registration(registrationDTO) {
        const newUser = new resident_entity_1.ResidentEntity();
        newUser.name = registrationDTO.name;
        newUser.email = registrationDTO.email;
        newUser.password = registrationDTO.password;
        newUser.phone = registrationDTO.phone;
        const res = await this.residentRepo.save(newUser);
        return [res];
    }
    async login(email, password) {
        const user = await this.residentRepo.findOne({
            where: { email, password },
        });
        return user;
    }
    async borrowBook(bookName) {
        const book = await this.bookRepo.findOne({
            where: { name: bookName },
        });
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        const myBook = new resident_entity_1.MyBookEntity();
        myBook.Product_ID = book.id;
        myBook.name = book.name;
        myBook.author = book.author;
        myBook.category = book.category;
        await this.myBookRepo.save(myBook);
        return `${book.name} successfully borrowed`;
    }
    async findByName(name) {
        const book = await this.bookRepo.findOne({ where: { name } });
        if (book) {
            return `Book "${name}" found.`;
        }
        else {
            return `Book "${name}" is not available.`;
        }
    }
    async viewAllBooks() {
        const books = await this.bookRepo.find();
        if (books.length === 0) {
            return 'No Books Available';
        }
        return books;
    }
    async viewMyBooks() {
        const books = await this.myBookRepo.find();
        if (books.length === 0) {
            return "You haven't Purchased any book";
        }
        return books;
    }
    async deleteBookByName(name) {
        const product = await this.myBookRepo.findOne({ where: { name } });
        if (!product) {
            throw new common_1.NotFoundException(`You haven't borrowed the product ${name}`);
        }
        await this.myBookRepo.remove(product);
        return `Book ${name} has been deleted`;
    }
    async buyProduct(buyProductDto) {
        const { productName, quantity } = buyProductDto;
        const product = await this.allProductRepo.findOne({
            where: { name: productName },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with name ${productName} not found`);
        }
        if (product.quantity < quantity) {
            throw new common_1.BadRequestException('Not enough quantity available');
        }
        product.quantity -= quantity;
        await this.allProductRepo.save(product);
        const totalPrice = product.price * quantity;
        const myProduct = new resident_entity_1.MyProductEntity();
        myProduct.product_id = product.product_id;
        myProduct.name = product.name;
        myProduct.quantity = quantity;
        myProduct.totalPrice = totalPrice;
        await this.myProductRepo.save(myProduct);
        return { message: 'Product purchased successfully', myProduct };
    }
    async updateProduct(productName, quantity) {
        const myProduct = await this.myProductRepo.findOne({
            where: { name: productName },
        });
        if (!myProduct) {
            return {
                message: `Product with name ${productName} not found in your products`,
            };
        }
        const product = await this.allProductRepo.findOne({
            where: { name: productName },
        });
        if (!product) {
            throw new common_1.BadRequestException(`Product with name ${productName} not found in all products`);
        }
        if (product.quantity < quantity) {
            throw new common_1.BadRequestException('Not enough quantity available to update');
        }
        const quantityDifference = quantity - myProduct.quantity;
        myProduct.quantity = quantity;
        const totalPriceDifference = quantityDifference * product.price;
        myProduct.totalPrice += totalPriceDifference;
        await this.myProductRepo.save(myProduct);
        product.quantity -= quantityDifference;
        await this.allProductRepo.save(product);
        return { message: 'Product updated successfully' };
    }
    async viewAllProduct() {
        const product = await this.allProductRepo.find();
        if (product.length === 0) {
            return 'No product Available';
        }
        return product;
    }
    async viewBoughtProduct() {
        const product = await this.myProductRepo.find();
        if (product.length === 0) {
            return 'No product Available';
        }
        return product;
    }
    async cancelOrder(productName) {
        const myProduct = await this.myProductRepo.findOne({
            where: { name: productName },
        });
        if (!myProduct) {
            throw new common_1.NotFoundException(`You haven't ordered the product ${productName}`);
        }
        const allProduct = await this.allProductRepo.findOne({
            where: { name: productName },
        });
        if (!allProduct) {
            throw new common_1.NotFoundException(`Product ${productName} not found in the inventory to return`);
        }
        allProduct.quantity += myProduct.quantity;
        await Promise.all([
            this.myProductRepo.remove(myProduct),
            this.allProductRepo.save(allProduct),
        ]);
        return `Order for ${productName} has been successfully canceled.`;
    }
};
exports.ResidentService = ResidentService;
exports.ResidentService = ResidentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(resident_entity_1.ResidentEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(resident_entity_1.BookEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(resident_entity_1.MyBookEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(resident_entity_1.AllProductEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(resident_entity_1.MyProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ResidentService);
//# sourceMappingURL=resident.service.js.map