import { IsString, IsEmail, IsNotEmpty, IsNotEmptyObject, ValidateNested , MaxLength , MinLength, Matches } from 'class-validator';
import { Type  } from 'class-transformer';




class UserNameDto {
    @IsString()
    @MaxLength(24)
    @MinLength(3)
    @Matches(/^[A-Za-z]+$/)
    f: string;

    @IsString()
    @MaxLength(24)
    @MinLength(3)
    @Matches(/^[A-Za-z]+$/)
    l: string
}


//dati di login
export class UserSignInDto {

    @ValidateNested()
    @Type(() => UserNameDto)
    @IsNotEmptyObject()
    name: UserNameDto


    //username
    @IsString()
    @MaxLength(24)
    @MinLength(3)
    usn: string;

    @IsEmail()
    @MaxLength(32)
    @MinLength(3)
    email: string;

    @IsString()
    @MaxLength(32)
    @MinLength(3)
    pas: string;
}

