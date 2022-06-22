import { LogLevel } from "../enum";

export interface LogModel{
    timeStamp:Date,
    logLevel:LogLevel
    transactionId:string,
    err:string
}