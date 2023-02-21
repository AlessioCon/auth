import { IsString, IsInt, IsEmail, IsNotEmpty, IsNotEmptyObject, isNotEmpty, isNotEmptyObject, ValidateNested } from 'class-validator';
import { Type  } from 'class-transformer';




class UserNameDto {
    @IsString()
    @IsNotEmpty()
    f: string;

    @IsString()
    @IsNotEmpty()
    l: string
}




export class UserSignInDto {

    @ValidateNested()
    @Type(() => UserNameDto)
    @IsNotEmptyObject()
    name: UserNameDto


    //username
    @IsNotEmpty()
    @IsString()
    usn: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    pass: string;
}