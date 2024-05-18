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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_dto_1 = require("./admin.dto");
const resident_dto_1 = require("../Resident/DTO/resident.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    registration(adminRegistrationDTO) {
        return this.adminService.registration(adminRegistrationDTO);
    }
    getAllUsers() {
        return this.adminService.getAllUsers();
    }
    getUserByEmail(email) {
        return this.adminService.getUserByEmail(email);
    }
    deleteUserById(id) {
        return this.adminService.deleteUserById(id);
    }
    updateUserbyID(id, data) {
        return this.adminService.updateUserById(id, data);
    }
    getUsersByName(name) {
        return this.adminService.getUsersByName(name);
    }
    async addUser(user) {
        return this.adminService.addUser(user);
    }
    async addEvent(myobj, myfile) {
        myobj.filename = myfile.filename;
        return this.adminService.addEvent(myobj);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('/registration'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminRegistrationDTO]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "registration", null);
__decorate([
    (0, common_1.Get)('/getallresidents'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('getresident/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getUserByEmail", null);
__decorate([
    (0, common_1.Delete)('deleteresident/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteUserById", null);
__decorate([
    (0, common_1.Put)('/updateresident/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_dto_1.UserUpdateDTO]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateUserbyID", null);
__decorate([
    (0, common_1.Get)('getresidentsbyname/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getUsersByName", null);
__decorate([
    (0, common_1.Post)('/addresident'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resident_dto_1.registrationDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addUser", null);
__decorate([
    (0, common_1.Post)('addevent'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('myfile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 3000000 },
        storage: (0, multer_1.diskStorage)({
            destination: './upload',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        })
    })),
    (0, common_1.UsePipes)(new common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminEventAnnouncementDTO, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addEvent", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('/admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map