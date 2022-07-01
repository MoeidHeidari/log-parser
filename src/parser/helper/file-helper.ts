import { Injectable, NotAcceptableException, Logger } from '@nestjs/common'
import * as fs from 'fs'
import * as readLine from 'readline'
import { Observable, of, reduce } from 'rxjs'
import { LogLevel, LogParserPatterns } from '../enum'
import { LogBuilder, LogModel } from '../model'
/**
 * File helper class
 */
@Injectable()
export class FileHelper<T> {
  //=======================================================================================================================================================================
  /**
   * Takes the path of the file, reads and returns back the reader interface
   * @param path path of the file to read
   * @returns readLine.Interface
   */
  async readFile (path: string): Promise<readLine.Interface> {
    return readLine.createInterface(fs.createReadStream(path))
  }
  //=======================================================================================================================================================================
  /**
   * Reads the input log file
   * @param path Address of the file to be red
   * @param filter Log level filter (An array of log levels)
   * @returns Promise<Observable<Array<T>>>
   */
  async readLogFile (
    path: string,
    filter: string[],
  ): Promise<Observable<Array<T>>> {
    return new Promise(async (resolve, reject) => {
      try {
        const reader = await this.readFile(path)
        const data: Array<T | any> = []
        reader.on('line', async (line: string) => {
          try {
            const log = await this.destructLog(line, filter)
            if (log) data.push(log)
          } catch (error) {
            Logger.warn(`Illigal format on line ${line}`)
          }
        })
        reader.on('close', () => {
          resolve(of(data))
        })
      } catch (error) {
        Logger.error(`file not readable or it does not exists`)
        reject(error)
      }
    })
  }
  //=======================================================================================================================================================================
  /**
   * Writes the given data (Parsed log json array) to the output log file
   * @param path address of the out put parsed log file
   * @param data data to be written inside the output log file
   * @returns Promise<any>
   */
  async writeLogFile (path, data: T[]): Promise<any> {
    return new Promise(function (resolve, reject) {
      fs.writeFile(path, JSON.stringify(data, null, 2), function (err) {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }
  //=======================================================================================================================================================================
  /**
   * checks if we should skip the log or not (based on the given array of the log levels to filter)
   * @param log_level log level that should be returned
   * @param filter log levels that we want to have
   * @returns boolean
   */
  isDestructable (log_level: string, filter: string[]): boolean {
    return !filter.includes(log_level) && filter.length > 0 ? false : true
  }
  //=======================================================================================================================================================================
  /**
   * instantiates, fills, and returns a LogModel object based on given patterns
   * @param log given log
   * @param filter array of the log level filters
   * @returns LogModel
   */
  fillLogModel (log: string, filter: string[]): LogModel {
    const builder = new LogBuilder()
    builder.addLogLevel(this.destructTextByPattern(LogParserPatterns.LOG_LEVEL,log).replace(/\s-\s/g, ''))
    if (!this.isDestructable(builder.getLog().logLevel, filter)) return
    builder.addTimeStamp(
      new Date(this.destructTextByPattern(LogParserPatterns.TIME_STAMP, log)).getTime(),
    )
    const log_info=JSON.parse( this.destructTextByPattern(LogParserPatterns.LOG_INFO,log))
    builder.addTransactionId(log_info.transactionId);
    builder.addErrorDetail(log_info.details);
    return builder.getLog();
  }
  //=======================================================================================================================================================================
  /**
   * checks if a given context matches the pattern then destruct the text inside
   * @param pattern patterns to match
   * @param context context to apply the pattern on
   * @returns string | undefined
   */
  destructTextByPattern (pattern: string, context: string): string | undefined {
    return context.match(pattern)[0]
  }
  //=======================================================================================================================================================================
  /**
   * parses a given log information according to the log level (it uses different regex patterns to find desired parts of the log info)
   * @param log log to be parsed
   * @param filter Log level filter (An array of log levels)
   * @returns Promise<T | any>
   */
  async destructLog (log: string, filter: string[]): Promise<T | any> {
    try {
      return this.fillLogModel(log, filter)
    } catch (error) {
      throw new NotAcceptableException(error)
    }
  }
}
