import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { DeleteScoreDto } from './dto/delete-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
// import { create } from 'domain';
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {
    constructor(
        private scoreService : ScoreService
    ){}

    @Post()
    async addScore(@Body() createScore : CreateScoreDto){
        return this.scoreService.createScore(createScore)
    }

    @Get()
    async getAll(){
        return this.scoreService.findAll()
    }

    @Patch()
    async updateScore(@Body() updateScore : UpdateScoreDto){
        console.log(updateScore)
        return this.scoreService.updateScore(updateScore)
    }

    @Delete(':id')
    async deleteScore(@Param() param : DeleteScoreDto){
        return this.scoreService.deleteScore(param)
    }
}
