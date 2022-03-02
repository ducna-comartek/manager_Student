import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from 'src/student/student.module';
import { SubjectModule } from 'src/subject/subject.module';
import { ScoreController } from './score.controller';
import { Score } from './score.entity';
import { ScoreService } from './score.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score]),
    StudentModule,
    SubjectModule
],
  controllers: [ScoreController],
  providers: [ScoreService]
})
export class ScoreModule {}
