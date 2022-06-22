import { Injectable, NotAcceptableException,Logger } from "@nestjs/common";
import * as fs from 'fs';
import * as rd from 'readline'
import { Observable, of } from "rxjs";
/**
 * File helper class
 */
@Injectable()
export class FileHelper<T>{
    
    //=======================================================================================================================================================================
    /**
     * Reads the input log file
     * @param path Address of the file to be red
     * @param filter Log level filter (An array of log levels)
     * @returns Promise<Observable<Array<T>>>
     */
    async readLogFile<T>(path: string, filter: string[]): Promise<Observable<Array<T>>> {
        return new Promise((resolve, reject) => {
            try {
                let reader = rd.createInterface(fs.createReadStream(path));
                var data: Array<T | any> = [];
                reader.on("line", async (line: string) => {
                    try {
                        let log=await this.parsLog(line,filter);
                        if(log) data.push(log);
                    } catch (error) {
                        Logger.warn(`Illigal format on line ${line}`);
                    }
                })
                reader.on("close", () => {
                    resolve(of(data))
                })
            } catch (error) {
                Logger.error(`file not readable or it does not exists`);
                reject(error);
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
    async writeLogFile<T>(path,data:T[]):Promise<any>{
        return new Promise(function(resolve, reject) {
            fs.writeFile(path, JSON.stringify(data, null, 2), function(err) {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
    //=======================================================================================================================================================================
    /**
     * parses a given log information according to the log level (it uses different regex patterns to find desired parts of the log info)
     * @param log log to be parsed
     * @param filter Log level filter (An array of log levels)
     * @returns Promise<T | any>
     */
    async parsLog(log: string,filter:string[]): Promise<T | any> {
        try {
            let log_level:string = log.match('\\s-\\s\\w+\\s-\\s')[0].replace(/\s-\s/g, "");
            if(!filter.includes(log_level) && filter.length >0) return;
            let time_stamp = new Date(log.match('[0-9]{1,4}\-[0-9]{1,2}\-[0-9]{1,2}[A-Z][0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}.[0-9]{1,3}[A-Z]')?.[0]).getTime();
            let log_info = JSON.parse(log.match('{(?:)(.*)}')[0]);
            let transaction_id = log_info.transactionId;
            let err = log_info.details;
            return { timestamp: time_stamp, logLevel: log_level, transactionId: transaction_id, err: err }
        } catch (error) {
            throw new NotAcceptableException(error);   
        }
    }
}
