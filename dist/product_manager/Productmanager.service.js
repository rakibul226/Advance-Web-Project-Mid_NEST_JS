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
exports.ProductmanagerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Productmanager_entity_1 = require("./Productmanager.entity");
const common_2 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let ProductmanagerService = class ProductmanagerService {
    constructor(ProductmanagerRepo) {
        this.ProductmanagerRepo = ProductmanagerRepo;
    }
    async register(registrationDTO) {
        const { name, email, password, phone, role } = registrationDTO;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.ProductmanagerRepo.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });
        await this.ProductmanagerRepo.save(newUser);
        return newUser;
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
    async verifyPassword(providedPassword, storedHash) {
        return bcrypt.compare(providedPassword, storedHash);
    }
    async login(email, password) {
        const user = await this.ProductmanagerRepo.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
    async changePassword(email, changePasswordDto) {
        const user = await this.ProductmanagerRepo.findOne({ where: { email } });
        if (!user) {
            throw new common_2.NotFoundException('User not found');
        }
        const passwordValid = await bcrypt.compare(changePasswordDto.currentPassword, user.password);
        if (!passwordValid) {
            throw new common_2.BadRequestException('Invalid current password');
        }
        const newPasswordHash = await bcrypt.hash(changePasswordDto.newPassword, 10);
        user.password = newPasswordHash;
        await this.ProductmanagerRepo.save(user);
    }
    async getAllUsers() {
        return this.ProductmanagerRepo.find();
    }
    async findOne(id) {
        return await this.ProductmanagerRepo.findOne({ where: { id } });
    }
    async update(id, updateprofileDTO) {
        await this.ProductmanagerRepo.update(id, updateprofileDTO);
        return this.findOne(id);
    }
};
exports.ProductmanagerService = ProductmanagerService;
exports.ProductmanagerService = ProductmanagerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Productmanager_entity_1.ProductmanagerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductmanagerService);
//# sourceMappingURL=Productmanager.service.js.map