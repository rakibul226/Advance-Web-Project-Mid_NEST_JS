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
exports.Productentity = exports.ProductpictureEntity = void 0;
const typeorm_1 = require("typeorm");
const Comment_entity_1 = require("./Comment.entity");
let ProductpictureEntity = class ProductpictureEntity {
};
exports.ProductpictureEntity = ProductpictureEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductpictureEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, }),
    __metadata("design:type", String)
], ProductpictureEntity.prototype, "productname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductpictureEntity.prototype, "filename", void 0);
exports.ProductpictureEntity = ProductpictureEntity = __decorate([
    (0, typeorm_1.Entity)('Productpicture')
], ProductpictureEntity);
let Productentity = class Productentity {
};
exports.Productentity = Productentity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Productentity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Productentity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Productentity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Productentity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Productentity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_entity_1.CommentEntity, comment => comment.product, { cascade: true }),
    __metadata("design:type", Array)
], Productentity.prototype, "comments", void 0);
exports.Productentity = Productentity = __decorate([
    (0, typeorm_1.Entity)('products')
], Productentity);
//# sourceMappingURL=Products.entity.js.map