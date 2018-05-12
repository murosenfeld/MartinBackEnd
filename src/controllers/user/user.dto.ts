import { IsEmail, IsNotEmpty as Required, IsOptional, IsUrl, MinLength } from 'class-validator';
import { JsonProperty } from 'ts-express-decorators';

export class UserUpdateDto {
    @IsEmail()
    @JsonProperty()
    email: string;

    @JsonProperty()
    @MinLength(6)
    password: string;

    @JsonProperty()
    firstName: string;

    @JsonProperty()
    lastName: string;

    @JsonProperty()
    @IsUrl()
    @IsOptional()
    picture?: string;
}