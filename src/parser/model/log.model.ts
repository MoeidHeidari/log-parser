import { LogLevel } from '../enum'

export interface Builder {
  addLogLevel(logLevel: string): void
  addTimeStamp(timeStamp: number): void
  addTransactionId(transactionid: string): void
  addErrorDetail(errorDetail: string): void
}

/**
 * Log model (We generate  the parsed log json objects based on this model)
 */
export class LogBuilder implements Builder {
  private log: LogModel

  constructor () {
    this.reset()
  }

  public reset (): void {
    this.log = new LogModel()
  }

  public addLogLevel (log_level: string): void {
    this.log.logLevel =log_level as LogLevel
  }
  public addTimeStamp (timeStamp: number): void {
    this.log.timeStamp = timeStamp
  }
  public addTransactionId (transactionid: string): void {
    this.log.transactionId = transactionid
  }
  public addErrorDetail (errorDetail: string): void {
    this.log.err = errorDetail
  }

  public getLog (): LogModel {
    return this.log
  }
}

export class LogModel {
  /**
   * Timestamp of the log generated <Epoch Unix Timestamp>
   */
  timeStamp?: number
  /**
   * level of the log (error,debug,warn,info) <loglevel>
   */
  logLevel: LogLevel
  /**
   * transaction id of the log <UUID>
   */
  transactionId?: string
  /**
   * error message of the log <Error message>
   */
  err?: string
}
