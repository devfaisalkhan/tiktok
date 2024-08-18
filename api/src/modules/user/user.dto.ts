import { IsNotEmpty, IsString } from "class-validator";

export class RegisterDTO {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    name: string;

    @IsString()
    password: string;
}