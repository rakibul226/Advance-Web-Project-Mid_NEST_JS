import { Module } from '@nestjs/common';
import { ResidentModule } from './Resident/resident.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './Admin/admin.module';
import { ProductmanagerModule } from './product_manager/Productmanager.module';
import { LibraryModule } from './librarymanager/library/library.module';
import { BookModule } from './librarymanager/Book_Manager/book.module';
import { mailModule } from './Resident/Mail/mail.module';
// import { LibraryModule } from './librarymanager/library/library.module';
// import { BookModule } from './librarymanager/Book_Manager/book.module';

@Module({
  imports: [
    ResidentModule,
    AdminModule,
    ProductmanagerModule,
    LibraryModule,
    mailModule, // import your userModule  here
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root', // set your pgadmin password
      database: 'ever_neighbor', //Change to your database name
      autoLoadEntities: true,
      synchronize: true,
    }),
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
