// import { IsEmail, IsEnum, IsInt, IsString } from "class-validator"

// export class CreateUserDto {
    
//     @IsString()
//     name:string

//      @IsEmail()
//     email: string;
//     @IsInt()
//     age: number;
//     @IsString()
//     password: string;
//     @IsString()
//     @IsEnum(['f', 'm', 'u'])
//     gender: string;



//     // @IsString()
//     // profilepic:string
// }
// create-user.dto.ts
import { IsEmail, IsEnum, IsInt, IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(0)
  age: number;

  @MinLength(6)
  password: string;

  @IsEnum(['m', 'f', 'u'], { message: 'gender must be m, f or u' })
  gender: string;
}

