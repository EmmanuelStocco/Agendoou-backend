import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { EntrepreneurService } from './entrepreneur.service';
  import { CreateEntrepreneurDto } from './dto/create-entrepreneur.dto';
  import { UpdateEntrepreneurDto } from './dto/update-entrepreneur.dto';
  
  @Controller('entrepreneurs')
  export class EntrepreneurController {
    constructor(private readonly entrepreneurService: EntrepreneurService) {}
  
    @Post()
    create(@Body() createDto: CreateEntrepreneurDto) {
      return this.entrepreneurService.create(createDto);
    }
  
    @Get()
    findAll() {
      return this.entrepreneurService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.entrepreneurService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateDto: UpdateEntrepreneurDto,
    ) {
      return this.entrepreneurService.update(id, updateDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.entrepreneurService.remove(id);
    }
  }
  