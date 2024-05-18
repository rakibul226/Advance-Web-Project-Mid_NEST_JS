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
exports.UpdateProductDTO = exports.BuyProductDTO = exports.SearchDTO = exports.borrowBookDTO = exports.LoginDTO = exports.registrationDTO = void 0;
const class_validator_1 = require("class-validator");
class registrationDTO {
}
exports.registrationDTO = registrationDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], registrationDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], registrationDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(4, { message: 'Password must be at least 4 characters long' }),
    __metadata("design:type", String)
], registrationDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Phone number must contain only numbers' }),
    __metadata("design:type", String)
], registrationDTO.prototype, "phone", void 0);
class LoginDTO {
}
exports.LoginDTO = LoginDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
class borrowBookDTO {
}
exports.borrowBookDTO = borrowBookDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], borrowBookDTO.prototype, "bookName", void 0);
class SearchDTO {
}
exports.SearchDTO = SearchDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchDTO.prototype, "name", void 0);
class BuyProductDTO {
}
exports.BuyProductDTO = BuyProductDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BuyProductDTO.prototype, "productName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], BuyProductDTO.prototype, "quantity", void 0);
class UpdateProductDTO {
}
exports.UpdateProductDTO = UpdateProductDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDTO.prototype, "productName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateProductDTO.prototype, "quantity", void 0);
//# sourceMappingURL=resident.dto.js.map