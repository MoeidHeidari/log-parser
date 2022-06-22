import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { FileHelper } from '../helper';
import { take } from 'rxjs'
import { LogModel } from '../model';
import { ParserCommandDTO } from '../dtos/parser-command-dto';

@Injectable()
export class ParserService {
  constructor(@Inject('FILE_HELPER') private readonly file_helper:FileHelper<LogModel>){}
  async parse(command: ParserCommandDTO): Promise<any> {
    return new Promise(async (resolve,reject) => {
      try {
        (await this.file_helper.readLogFile<LogModel>(command.input,command.logLevel)).pipe(take(1)).subscribe(async(data: any) => {
          await this.file_helper.writeLogFile(command.output,data);
          resolve(data);
        });
      } catch (error) {
        reject(error)
      }
      
    }).catch(error=>{
      throw new NotAcceptableException(error); 
    });

  }
}