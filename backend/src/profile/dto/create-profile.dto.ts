import { ApiProperty } from "@nestjs/swagger"

export class CreateProfileDto {
      @ApiProperty({ example: '2020-12-02' })
      birthday : Date
      @ApiProperty({ example: 'male' })
      gender :string
      @ApiProperty({ example: 'sagitarius' })
      zodiac :string
      @ApiProperty({ example: '60' })
      weight :number
      @ApiProperty({ example: 'this about a user' })
      about  : string
      @ApiProperty({ example: '180' })
      height :number
}
