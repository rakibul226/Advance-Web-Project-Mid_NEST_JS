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
exports.LibraryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const registration_entity_1 = require("./Entity/registration.entity");
let LibraryService = class LibraryService {
    constructor(libraryRepo) {
        this.libraryRepo = libraryRepo;
    }
    async registration(registrationDTO) {
        const newUser = new registration_entity_1.RegistrationEntity();
        newUser.name = registrationDTO.name;
        newUser.email = registrationDTO.email;
        newUser.password = registrationDTO.password;
        newUser.phone = registrationDTO.phone;
        newUser.role = registrationDTO.role;
        const lib = await this.libraryRepo.save(newUser);
        return [lib];
    }
    async login(email, password) {
        const user = await this.libraryRepo.findOne({
            where: { email, password },
        });
        return user || null;
    }
};
exports.LibraryService = LibraryService;
exports.LibraryService = LibraryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(registration_entity_1.RegistrationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LibraryService);
//# sourceMappingURL=library.service.js.map