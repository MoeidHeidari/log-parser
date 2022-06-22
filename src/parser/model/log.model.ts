import { LogLevel } from "../enum";
/**
 * Log model (We generate  the parsed log json objects based on this model)
 */
export interface LogModel{
    /**
     * Timestamp of the log generated <Epoch Unix Timestamp>
     */
    timeStamp:Date,
    /**
     * level of the log (error,debug,warn,info) <loglevel>
     */
    logLevel:LogLevel
    /**
     * transaction id of the log <UUID>
     */
    transactionId:string,
    /**
     * error message of the log <Error message>
     */
    err:string
}