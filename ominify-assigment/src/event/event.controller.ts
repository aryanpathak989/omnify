import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { EventAttende, EventDto } from './dto/event.dto';

@Controller('events')
export class EventController {

    constructor(private eventService: EventService){}

    @Post("/")
    async createEvent( @Body() event: EventDto){
        console.log({event})
        return await this.eventService.createEvent(event)
    }

    @Get("/")
    async getAllEvent(){
        return await this.eventService.getAllEvent()
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
