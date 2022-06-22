import { NotAcceptableException } from "@nestjs/common";
import { validate } from "class-validator";

/**
 * validates dto and returns bad request if it is wrong
 * @param dto dto
 * @param httpResponseGenerator http response service
 */
 export async function validateDTO(dto: any): Promise<any> {
    const errors = await validate(dto);
  
    if (errors.length) throw new Error(`InvalidArgumentExcpetion ${errors}`);
  
    return dto;
  }
  