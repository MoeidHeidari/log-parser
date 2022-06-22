import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LogLevel } from "../enum";

/**
 * list of allowed properties
 */
const allowedProperties = ['input', 'output', 'logLevel'];
/**
 * Log parser command DTO
 */
export class ParserCommandDTO{
  /**
  * addres of the log file input
  */
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    input:string;
    //...........................................................................................................
    /**
    * address of the output log file
    */
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    output:string;
    //...........................................................................................................
    /**
    * list of log levels to be filtered by the parser
    */
    @IsOptional()
    @IsEnum(LogLevel, { each: true })
    logLevel:LogLevel[]
    //...........................................................................................................
    /**
     * Constructs the DTO based on given properties
     * @param properties list of passed properties  to the DTO
     */
    constructor(properties: any = {}) {
        Object.keys(properties).forEach((key: string) => {
          if (allowedProperties.includes(key)) this[key as keyof this] = properties[key];
        });
      }
    
}