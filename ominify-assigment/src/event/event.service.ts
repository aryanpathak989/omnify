import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventAttende, EventDto } from './dto/event.dto';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from 'generated/prisma/runtime/library';

@Injectable()
export class EventService {


    constructor(private prisma:PrismaService){}

    async createEvent(eventDetails:EventDto){

        try{

            console.log("Starting event")
            const event = await this.prisma.event.create({
                data:{
                    name:eventDetails.name,
                    location:eventDetails.name,
                    start_time:eventDetails.startTime,
                    end_time: eventDetails.endTime,
                    max_capcity:eventDetails.max_capacity
                }
            })

            console.log(event)

            return event
        }
        catch(err){
            throw new InternalServerErrorException()
        }

    }


    async getAllEvent(){

        try{

            const events = await this.prisma.event.findMany({
            })
            return events
        }
        catch(err){
            throw new InternalServerErrorException()
        }

    }

    async registerAttendy(eventAttende: EventAttende,eventId: string){

        try{

            const eventDetails = await this.prisma.event.findUnique({
                where:{
                    id:eventId
                }
            })

            const countEventAttende = await this.prisma.eventAttendees.count({
                where:{
                    event_id:eventId
                }
            })

            if(countEventAttende+1>eventDetails?.max_capcity!){
                throw new BadRequestException("Event is over booked")
            }
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
            if(err instanceof BadRequestException){
                throw new BadRequestException("Event is over booked")
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
