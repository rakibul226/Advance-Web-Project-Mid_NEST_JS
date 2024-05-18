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
exports.AdminEventAnnouncementDTO = exports.UserUpdateDTO = exports.AdminRegistrationDTO = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
class AdminRegistrationDTO {
}
exports.AdminRegistrationDTO = AdminRegistrationDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminRegistrationDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], AdminRegistrationDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(4, { message: 'Password must be at least 4 characters long' }),
    __metadata("design:type", String)
], AdminRegistrationDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Phone number must contain only numbers' }),
    __metadata("design:type", String)
], AdminRegistrationDTO.prototype, "phone", void 0);
class UserUpdateDTO {
}
exports.UserUpdateDTO = UserUpdateDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserUpdateDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], UserUpdateDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(4, { message: 'Password must be at least 4 characters long' }),
    __metadata("design:type", String)
], UserUpdateDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Phone number must contain only numbers' }),
    __metadata("design:type", String)
], UserUpdateDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['admin', 'resident', 'librarian', 'manager']),
    __metadata("design:type", String)
], UserUpdateDTO.prototype, "role", void 0);
class AdminEventAnnouncementDTO {
}
exports.AdminEventAnnouncementDTO = AdminEventAnnouncementDTO;
__decorate([
    (0, common_1.Optional)(),
    __metadata("design:type", Number)
], AdminEventAnnouncementDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminEventAnnouncementDTO.prototype, "eventName", void 0);
//# sourceMappingURL=admin.dto.js.map