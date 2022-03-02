import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from 'src/class/class.module';
import { StudentController } from './student.controller';
import { Student } from './student.entity';
import { StudentService } from './student.service';

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
