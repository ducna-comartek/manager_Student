import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { ClassModule } from 'src/class/class.module';
import { StudentController } from './student.controller';
import { Student } from './student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    ClassModule
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports : [StudentService] 
})
export class StudentModule {}
