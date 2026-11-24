import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSupportRequestDto {
  @ApiProperty({ example: 'Listing not publishing' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  subject!: string;

  @ApiProperty({ example: 'My listings' })
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  topic!: string;

  @ApiProperty({
    example:
      'I submitted my DHA plot listing yesterday but it still shows as draft.',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(4000)
  message!: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'Optional image data-URLs or URLs (max 2)',
    example: ['data:image/jpeg;base64,/9j/4AAQ...'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(2)
  @IsString({ each: true })
  @MaxLength(5000000, { each: true })
  attachments?: string[];

  @ApiProperty({ example: '+92 300 1234567' })
  @IsString()
  @MinLength(7)
  @MaxLength(40)
  phone!: string;
}
