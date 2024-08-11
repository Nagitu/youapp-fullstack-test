import { ApiProperty } from "@nestjs/swagger"

export class LoginDto {

    @ApiProperty({ example: 'suika' })
    "username" : string

    @ApiProperty({ example: 'suika@mail.com' })
    "email" : string

    @ApiProperty({ example: 'password' })
    "password" : string
}