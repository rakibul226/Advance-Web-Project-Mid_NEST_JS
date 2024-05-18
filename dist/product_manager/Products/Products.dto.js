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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCommentDTO = exports.ProductpictureDTO = exports.DeleteProductDTO = exports.UpdateProductDTO = exports.CreateProductDTO = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
class CreateProductDTO {
}
exports.CreateProductDTO = CreateProductDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDTO.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDTO.prototype, "quantity", void 0);
class UpdateProductDTO extends CreateProductDTO {
}
exports.UpdateProductDTO = UpdateProductDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDTO.prototype, "id", void 0);
class DeleteProductDTO {
}
exports.DeleteProductDTO = DeleteProductDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteProductDTO.prototype, "id", void 0);
class ProductpictureDTO {
}
exports.ProductpictureDTO = ProductpictureDTO;
__decorate([
    (0, common_1.Optional)(),
    __metadata("design:type", Number)
], ProductpictureDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductpictureDTO.prototype, "productname", void 0);
class PostCommentDTO {
}
exports.PostCommentDTO = PostCommentDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostCommentDTO.prototype, "content", void 0);
//# sourceMappingURL=Products.dto.js.map