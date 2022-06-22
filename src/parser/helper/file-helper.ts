import { Injectable, NotAcceptableException } from "@nestjs/common";
import * as fs from 'fs';
import * as rd from 'readline'
import { Observable, of } from "rxjs";
import { Logger } from '@nestjs/common';

@Injectable()
export class FileHelper<T>{
    
    //=======================================================================================================================================================================
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
    async writeLogFile<T>(path,data:T[]):Promise<any>{
        return new Promise(function(resolve, reject) {
            fs.writeFile(path, JSON.stringify(data, null, 2), function(err) {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
    //=======================================================================================================================================================================
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
