import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { FileHelper } from '../helper';
import { take } from 'rxjs';
import { LogModel } from '../model';
import { ParserCommandDTO } from '../dtos/parser-command-dto';

/**
 * Log parser service
 */
@Injectable()
export class ParserService {
  /**
   *Constructs the log parser service
   * @param file_helper file helper injection (useful to work with the log files) represented as a single tone class
   */
  constructor(
    @Inject('FILE_HELPER') private readonly file_helper: FileHelper<LogModel>,
  ) {}
  //==============================================================================================================
  /**
   * Parses the input log file based on the provided commands
   * @param command Command entered by the user (Comming from Command class)
   * @returns Promise<any>
   */
  async parse(command: ParserCommandDTO): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        (await this.file_helper.readLogFile(command.input, command.logLevel))
          .pipe(take(1))
          .subscribe(async (data: any) => {
            await this.file_helper.writeLogFile(command.output, data);
            resolve(data);
          });
      } catch (error) {
        reject(error);
      }
    }).catch((error) => {
      throw new NotAcceptableException(error);
    });
  }
}
