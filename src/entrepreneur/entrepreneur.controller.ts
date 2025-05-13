import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { EntrepreneurService } from './entrepreneur.service';
import { CreateEntrepreneurDto } from './dto/create-entrepreneur.dto';
import { UpdateEntrepreneurDto } from './dto/update-entrepreneur.dto';

@Controller('entrepreneurs')
export class EntrepreneurController {
  constructor(private readonly entrepreneurService: EntrepreneurService) { }

  @Post()
  create(@Body() createDto: CreateEntrepreneurDto) {
    return this.entrepreneurService.create(createDto);
  }

  @Get()
  findAll() {
    return this.entrepreneurService.findAll();
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

  @Get('search')
  search(@Query('q') query: string) {
    console.log('search query:', query); // Log da busca
    return this.entrepreneurService.searchCompanies(query);
  } 

  @Get('hours')  
  async getAppointmentHours(
    @Query('entrepreneurId') entrepreneurId: string,
    @Query('date') date: string, 
  ) { 
    console.log('entrepreneurId:', entrepreneurId); 
    return this.entrepreneurService.getAppointmentHours(entrepreneurId, date);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.entrepreneurService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.entrepreneurService.findOne(id);
  } 
}
