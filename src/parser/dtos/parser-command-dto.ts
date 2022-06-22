import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LogLevel } from "../enum";

const allowedProperties = ['input', 'output', 'logLevel'];
export class ParserCommandDTO{
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    input:string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    output:string;
    
    @IsOptional()
    @IsEnum(LogLevel, { each: true })
    logLevel:LogLevel[]

    constructor(properties: any = {}) {
        Object.keys(properties).forEach((key: string) => {
          if (allowedProperties.includes(key)) this[key as keyof this] = properties[key];
        });
      }
    
}