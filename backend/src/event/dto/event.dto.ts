import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty } from "class-validator";


export class EventDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    location: string;

    @ApiProperty()
    @IsNotEmpty()
    startTime: string

    @ApiProperty()
    @IsNotEmpty()
    endTime: string

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    max_capacity: number

}

export class EventAttende {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

}