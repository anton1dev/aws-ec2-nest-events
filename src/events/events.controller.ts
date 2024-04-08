import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Body,
  HttpCode,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';
import { Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findAll() {
    return this.repository.find();
  }

  @Get('/practice')
  async practice() {
    return await this.repository.find({
      select: ['id', 'when'],
      where: [
        {
          id: MoreThan(3),
          when: MoreThan(new Date('2021-02-12T13:00:00')),
        },
        {
          description: Like('%meet%'),
        },
      ],
      take: 2,
      order: {
        id: 'ASC',
      },
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id) {
    return await this.repository.findOne(id);
  }

  @UsePipes()
  @Post()
  async create(
    @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto,
  ) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe({ groups: ['update'] })) input: UpdateEventDto,
  ) {
    const eventToPatch = await this.repository.findOne(id);

    return await this.repository.save({
      ...eventToPatch,
      ...input,
      when: input.when ? new Date(input.when) : eventToPatch.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const eventToDelete = await this.repository.findOne(id);

    await this.repository.remove(eventToDelete);
  }
}
