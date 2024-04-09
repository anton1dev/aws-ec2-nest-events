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
  Query,
  NotFoundException,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { CreateEventDto } from './input/create-event.dto';
import { UpdateEventDto } from './input/update-event.dto';
import { EventsService } from './events.service';
import { ListEvents } from './input/list.events';
import { AuthGuardJwt } from './../auth/auth-guard.jwt';
import { CurrentUser } from './../auth/current-user.decorator';
import { User } from './../auth/user.entity';

@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() filter: ListEvents) {
    const events =
      await this.eventsService.getEventsWithAttendeeCountFilteredPaginated(
        filter,
        {
          total: true,
          currentPage: filter.page,
          limit: 3,
        },
      );
    return events;
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const event = await this.eventsService.getEventWithAttendeeCount(id);

    if (!event) {
      throw new NotFoundException();
    }

    return event;
  }

  @UsePipes()
  @Post()
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto,
    @CurrentUser() user: User,
  ) {
    return await this.eventsService.createEvent(input, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id,
    @Body(new ValidationPipe({ groups: ['update'] })) input: UpdateEventDto,
    @CurrentUser() user: User,
  ) {
    const eventToPatch = await this.eventsService.findOne(id);

    if (!eventToPatch) {
      throw new NotFoundException();
    }

    if (eventToPatch.organizerId !== user.id) {
      throw new ForbiddenException(null, `You can't do this!`);
    }

    return await this.eventsService.updateEvent(eventToPatch, input);
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt)
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id, @CurrentUser() user: User) {
    const eventToDelete = await this.eventsService.findOne(id);

    if (!eventToDelete) {
      throw new NotFoundException();
    }

    if (eventToDelete.organizerId !== user.id) {
      throw new ForbiddenException(null, `You can't delete this event!`);
    }

    await this.eventsService.deleteEvent(id);
  }
}
