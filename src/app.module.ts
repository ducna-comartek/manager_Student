import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { ScoreModule } from './score/score.module';
import { SubjectService } from './subject/subject.service';
import { SubjectController } from './subject/subject.controller';
import { SubjectModule } from './subject/subject.module';
import { Class } from './class/class.entity';
import { Student } from './student/student.entity';
import { Score } from './score/score.entity';
import { Subject } from './subject/subject.entity';
@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'Anhduc123',
        database: 'manager_student',
        entities: [Class, Student,Score,Subject],
        synchronize: true,
      }),
      StudentModule,
      ClassModule,
      ScoreModule,
      SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
