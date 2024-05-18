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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const resident_entity_1 = require("../Resident/ENTITY/resident.entity");
const typeorm_3 = require("typeorm");
const admin_entity_1 = require("./admin.entity");
let AdminService = class AdminService {
    constructor(adminRepo, residentRepo, adminRegistrationRepo) {
        this.adminRepo = adminRepo;
        this.residentRepo = residentRepo;
        this.adminRegistrationRepo = adminRegistrationRepo;
    }
    async registration(adminDTO) {
        const newUser = new admin_entity_1.AdminEntity();
        newUser.name = adminDTO.name;
        newUser.email = adminDTO.email;
        newUser.password = adminDTO.password;
        newUser.phone = adminDTO.phone;
        const res = await this.adminRegistrationRepo.save(newUser);
        return [res];
    }
    async getAllUsers() {
        return this.residentRepo.find();
    }
    async getUserByEmail(email) {
        return this.residentRepo.findOneBy({ email: email });
    }
    deleteUserById(id) {
        return this.residentRepo.delete({ id: id });
    }
    async updateUserById(id, data) {
        await this.residentRepo.update(id, data);
        return this.residentRepo.findOneBy({ id });
    }
    getUsersByName(name) {
        return this.residentRepo.find({
            where: {
                name: (0, typeorm_3.Like)(`%${name}%`),
            },
        });
    }
    async addUser(user) {
        await this.residentRepo.save(user);
        return user;
    }
    async addEvent(myobj) {
        return await this.adminRepo.save(myobj);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(admin_entity_1.AdminAnnouncedEventEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(resident_entity_1.ResidentEntity)),
    __param(2, (0, typeorm_2.InjectRepository)(admin_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map