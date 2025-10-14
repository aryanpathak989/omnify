import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { JwtAuthGuard } from 'src/auth/guard';
import { CurrentUser } from 'src/auth/decorator';
import { EventAttende, EventDto } from './dto/event.dto';

@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventController {

    constructor(private eventService: EventService){}

    @Post("/")
    async createEvent(@CurrentUser() user, @Body() event: EventDto){
        return await this.eventService.createEvent(user.id,event)
    }

    @Get("/")
    async getAllEvent(@CurrentUser() user){
        return await this.eventService.getAllEvent(user.id)
    }

    @Post("/:event_id/register")
    async addAttendes(@Body() event: EventAttende, @Param("event_id") event_id: string){
        return await this.eventService.registerAttendy(event, event_id)
    }

    @Get("/:event_id/attendees")
    async getAttendes(@Param("event_id") event_id: string){
        return await this.eventService.getAllRegisterAttendy(event_id)
    }


}
