"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const resident_module_1 = require("./Resident/resident.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const admin_module_1 = require("./Admin/admin.module");
const Productmanager_module_1 = require("./product_manager/Productmanager.module");
const library_module_1 = require("./librarymanager/library/library.module");
const book_module_1 = require("./librarymanager/Book_Manager/book.module");
const Products_module_1 = require("./product_manager/Products/Products.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            resident_module_1.ResidentModule,
            admin_module_1.AdminModule,
            Productmanager_module_1.ProductmanagerModule,
            library_module_1.LibraryModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'root',
                database: 'ever_neighbor',
                autoLoadEntities: true,
                synchronize: true,
            }),
            book_module_1.BookModule, Products_module_1.ProductModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map