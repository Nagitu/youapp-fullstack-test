import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {

    @ApiProperty({ example: 'suika' })
    username: string;

    @ApiProperty({ example: 'suika@test.com' })
    email: string;

    @ApiProperty({ example: 'password' })
    password: string;
  }
  