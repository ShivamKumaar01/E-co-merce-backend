import { IsInt, IsString } from "class-validator";

export class CreateAddressDto {
    @IsString()
    location: string;

    @IsInt()
    userId: number;

    @IsString()
    street:string

    @IsString()
    state: string
    @IsString()
    city: string

    @IsInt()
    postalCode: number
}
