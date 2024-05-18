import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationEntity } from './Entity/registration.entity';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrationEntity])],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}