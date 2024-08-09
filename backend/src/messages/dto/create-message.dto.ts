import { ApiProperty } from "@nestjs/swagger"

export class CreateMessageDto {
    @ApiProperty({ example: '32adcdaf-2db8-4a72-b047-2e7c6004dd2c' })
    chatRoom: string
    @ApiProperty({ example: 'ini pesan pertama' })
    message : string
}
