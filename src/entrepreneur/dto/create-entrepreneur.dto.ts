import { IsInt, IsString, IsOptional, IsJSON } from 'class-validator'; 


export class CreateEntrepreneurDto {
  @IsInt()
  userId: number;

  @IsString()
  businessName: string;

  @IsOptional()
  @IsString()
  themeColor?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsJSON()
  availableDays: any;

  @IsJSON()
  availableHours: any;

  @IsJSON()
  services: any;
}
