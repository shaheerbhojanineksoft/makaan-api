import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateAgencyProfileDto {
  @ApiPropertyOptional({ example: 'Ahmed Real Estate' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @ApiPropertyOptional({ example: 'Ahmed Realty' })
  @IsOptional()
  @IsString()
  @MaxLength(160)
  agency?: string;

  @ApiPropertyOptional({ example: 'Islamabad' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  city?: string;

  @ApiPropertyOptional({ example: '+92-300-1234567' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

  @ApiPropertyOptional({ example: '+92-300-1234567' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  whatsapp?: string;

  @ApiPropertyOptional({ example: 'agency@example.com' })
  @IsOptional()
  @IsEmail()
  @MaxLength(160)
  email?: string;

  @ApiPropertyOptional({ example: 'Blue Area, Islamabad' })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  officeAddress?: string;

  @ApiPropertyOptional({ example: 'Trusted real estate agency...' })
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  bio?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  profilePicture?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/cover.jpg' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  coverImage?: string;

  @ApiPropertyOptional({ example: 'REA-12345' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  licenseNumber?: string;

  @ApiPropertyOptional({ example: 'Within 1 hour' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  responseTime?: string;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  experienceYears?: number;

  @ApiPropertyOptional({ example: 15 })
  @IsOptional()
  @IsNumber()
  teamSize?: number;

  @ApiPropertyOptional({
    type: [String],
    example: ['Residential', 'Commercial'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specializations?: string[];

  @ApiPropertyOptional({
    type: [String],
    example: ['Islamabad', 'Rawalpindi'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  areasServed?: string[];

  @ApiPropertyOptional({
    type: [String],
    example: ['Buying', 'Selling', 'Renting'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  services?: string[];
}
