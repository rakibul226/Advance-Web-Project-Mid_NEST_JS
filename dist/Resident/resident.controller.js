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
exports.residentController = void 0;
const common_1 = require("@nestjs/common");
const resident_service_1 = require("./resident.service");
const resident_dto_1 = require("./DTO/resident.dto");
let residentController = class residentController {
    constructor(residentService) {
        this.residentService = residentService;
    }
    registration(registrationDTO) {
        return this.residentService.registration(registrationDTO);
    }
    async login(LoginDTO) {
        const { email, password } = LoginDTO;
        const user = await this.residentService.login(email, password);
        if (!user) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        return { message: 'Login successful' };
    }
    async borrowBook(borrowBookDTO) {
        return this.residentService.borrowBook(borrowBookDTO.bookName);
    }
    async findBookByName(searchDTO) {
        return this.residentService.findByName(searchDTO.name);
    }
    async viewAllBooks() {
        return await this.residentService.viewAllBooks();
    }
    async viewMyBooks() {
        return await this.residentService.viewMyBooks();
    }
    async deleteBookByName(name) {
        const message = await this.residentService.deleteBookByName(name);
        return message;
    }
    async buyProduct(buyProductDto) {
        return await this.residentService.buyProduct(buyProductDto);
    }
    async updateProduct(updateProductDto) {
        return this.residentService.updateProduct(updateProductDto.productName, updateProductDto.quantity);
    }
    async viewAllProduct() {
        return await this.residentService.viewAllProduct();
    }
    async viewBoughtProduct() {
        return await this.residentService.viewBoughtProduct();
    }
    async cancelOrder(name) {
        return this.residentService.cancelOrder(name);
    }
};
exports.residentController = residentController;
__decorate([
    (0, common_1.Post)('/registration'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resident_dto_1.registrationDTO]),
    __metadata("design:returntype", Object)
], residentController.prototype, "registration", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resident_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], residentController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/borrow-book'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resident_dto_1.borrowBookDTO]),
    __metadata("design:returntype", Promise)
], residentController.prototype, "borrowBook", null);
__decorate([
    (0, common_1.Get)('findbook/:name'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resident_dto_1.SearchDTO]),
    __metadata("design:returntype", Promise)
], residentController.prototype, "findBookByName", null);
__decorate([
    (0, common_1.Get)('/view-all-books'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], residentController.prototype, "viewAllBooks", null);
__decorate([
    (0, common_1.Get)('/viewBorrowedBook'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], residentController.prototype, "viewMyBooks", null);
__decorate([
    (0, common_1.Delete)('/delete/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], residentController.prototype, "deleteBookByName", null);
__decorate([
    (0, common_1.Post)('/buyProduct'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resident_dto_1.BuyProductDTO]),
    __metadata("design:returntype", Promise)
], residentController.prototype, "buyProduct", null);
__decorate([
    (0, common_1.Put)('/updateQuantity'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resident_dto_1.UpdateProductDTO]),
    __metadata("design:returntype", Promise)
], residentController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Get)('/view-all-product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], residentController.prototype, "viewAllProduct", null);
__decorate([
    (0, common_1.Get)('/viewBoughtProduct'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], residentController.prototype, "viewBoughtProduct", null);
__decorate([
    (0, common_1.Delete)('/cancel-order/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], residentController.prototype, "cancelOrder", null);
exports.residentController = residentController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [resident_service_1.ResidentService])
], residentController);
//# sourceMappingURL=resident.controller.js.map