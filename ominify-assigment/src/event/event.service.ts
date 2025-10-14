import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventAttende, EventDto } from './dto/event.dto';
import { User } from 'generated/prisma';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from 'generated/prisma/runtime/library';

@Injectable()
export class EventService {


    constructor(private prisma:PrismaService){}

    async createEvent(userId: string,eventDetails:EventDto){

        try{
            const event = await this.prisma.event.create({
                data:{
                    userId,
                    name:eventDetails.name,
                    location:eventDetails.name,
                    start_time:eventDetails.startTime,
                    end_time: eventDetails.endTime,
                    max_capcity:eventDetails.max_capacity
                }
            })

            return event
        }
        catch(err){
            throw new InternalServerErrorException()
        }

    }


    async getAllEvent(userId: string){

        try{

            const events = await this.prisma.event.findMany({
                where:{
                    userId
                }
            })
            return events
        }
        catch(err){
            throw new InternalServerErrorException()
        }

    }

    async registerAttendy(eventAttende: EventAttende,eventId: string){

        try{

            const response  = await this.prisma.eventAttendees.create({
                data:{
                    name: eventAttende.name,
                    email: eventAttende.email,
                    event_id: eventId
                }
            })

            return response

        }
        catch(err){
            if(err instanceof PrismaClientKnownRequestError){
                if (err.code === "P2002") {
                    throw new ConflictException("Email already exists");
                }
            }
              throw new InternalServerErrorException("Something went wrong");
        }

    }

    async getAllRegisterAttendy(eventId: string){

        try{

            const eventAttendeDetails = await this.prisma.eventAttendees.findMany({
                where:{
                    event_id:eventId
                }
            })

            return eventAttendeDetails

        }
        catch(err){
            throw new InternalServerErrorException()
        }
    }



}
