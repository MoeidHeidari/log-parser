### MAYD Log parser

### Full project documentation

This document descibes the structure and design of the project in detail.

version 0.0.1

---

### Features

- [x] reads log file
  
- [x] parses the logs and creates a json array from the log model
  
- [x] writes the log json array to a log json file
  
- [x] validates command with DTO
  
- [x] Handels all possible exceptions
  
- [x] takes the log level (optional)
  

> **Info**
> you can find a log file sample in the root of the source code

---

### Commands

```typescript

  @Command({
    command: '*',
    describe: 'parses a log file',
  })
  async parse (
    @Option({
      name: 'input',
      describe: 'input log file (ex: "input.log")',
      type: 'string',
      alias: 'i',
      required: true,
    })
    input: string,
    @Option({
      name: 'output',
      describe: 'output log file (ex: "output.log")',
      type: 'string',
      alias: 'o',
      default: 'output.log',
      required: true,
    })
    output: string,
    @Option({
      name: 'log-level',
      describe: 'log-level (ex: "error,[error,debug,warn,info]")',
      type: 'string',
      alias: 'l',
      default: 'error',
      required: false,
    })
    log_level: string,
  ) {
    try {
      let logFilter = log_level.split(',')
      let command = new ParserCommandDTO({
        input: input,
        output: output,
        logLevel: logFilter,
      })
      await validateDTO(command)
      return this.parserService
        .parse(command)
        .then(() => {
         console.log(`Success 😀. output is written in ${output}`)
        })
        .catch(error => {
          console.error(error);
        })
    } catch (error) {
      console.log(error)
    }
  }
}
```

### Parser service

```typescript

  async parse (command: ParserCommandDTO): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        ;(
          await this.file_helper.readLogFile<LogModel>(
            command.input,
            command.logLevel,
          )
        )
          .pipe(take(1))
          .subscribe(async (data: any) => {
            await this.file_helper.writeLogFile(command.output, data)
            resolve(data)
          })
      } catch (error) {
        reject(error)
      }
    }).catch(error => {
      throw new NotAcceptableException(error)
    })
  }
}
```

### Log levels enum

```typescript

export enum LogLevel{
    /**
     * Error log level
     */
    ERROR='error',
    /**
     * Info log level
     */
    INFO='info',
    /**
     * Warning log level
     */
    WARN='warn',
    /**
     * Debug log level
     */
    DEBUG='debug'
}
```

### Command dto

```typescript
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
```

### Generic file helper

```typescript
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
```

### Parser regex patters

log-level regex pattern

```typescript
let log_level:string = log.match('\\s-\\s\\w+\\s-\\s')[0].replace(/\s-\s/g, "");
```

timeStamp regex pattern

```typescript
let time_stamp = new Date(log.match('[0-9]{1,4}\-[0-9]{1,2}\-[0-9]{1,2}[A-Z][0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}.[0-9]{1,3}[A-Z]')?.[0])
```

logInfo regex pattern

```typescript
let log_info = JSON.parse(log.match('{(?:)(.*)}')[0]);
```

### CLI

```typescript
const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error'],
  })

  try {
    await app
      .select(CommandModule)
      .get(CommandService)
      .exec()
    await app.close()
  } catch (error) {
    console.error(error)
    await app.close()
    process.exit(1)
  }
```

---

## Test cases

### fileHelper test cases

```typescript
import { datatype } from "faker"

export const LOG_PARSER_TEST_CASE_1 = {
    data: `2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}`,
    logLevel:['info'],
    expectation: {
        should: "should return log object that matches the object in this test case ",
        value:{
            timestamp:2354321571253,
            logLevel:'info',
            transactionId:'9abc55b2-807b-4361-9dbe-aa88b1b2e978',
            err:'Service is started'
        }
    }
}
//===================================================================================================================================
export const LOG_PARSER_TEST_CASE_2 = {
    data: datatype.string(500),
    logLevel:['info','error','debug','warn'],
    expectation: {
        should: "should throw not acceptable exception "
    }
}
//===================================================================================================================================
export const LOG_PARSER_TEST_CASE_3 = {
    data: `2021-08-09T02:12:51.254Z - debug -`,
    logLevel:['info','error','debug','warn'],
    expectation: {
        should: "should throw not acceptable exception"
    }
}
//===================================================================================================================================
export const LOG_PARSER_TEST_CASE_4 = {
    data: `2021-08-09T02:12:51. - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request the user information","userId": 10}
    2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request user orders list","userId": 10}`,
    logLevel:['info','error','debug','warn'],
    expectation: {
        should: "should throw not acceptable exception"
    }
}
//===================================================================================================================================
export const LOG_PARSER_TEST_CASE_5 = {
    data: `2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}`,
    logLevel:[datatype.string(5)],
    expectation: {
        should: "should return log object that matches the object in this test case ",
        value:undefined
    }
}
//===================================================================================================================================
export const LOG_PARSER_TEST_CASE_6 = {
    data: `2021-08-09T02:12:51.262Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user":{"id":16,"orders":[{"id":472,"items":{"id":7,"price":7.12}}]}}`,
    logLevel:['debug'],
    expectation: {
        should: "should contain a correct log level ",
        value:{
            logLevel:'debug'
        }
    }
}
//===================================================================================================================================
export const LOG_PARSER_TEST_CASE_7 = {
    data: `2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}`,
    logLevel:['error'],
    expectation: {
        should: "should contain a correct log level ",
        value:{
            logLevel:'error',
            transactionId:'9abc55b2-807b-4361-9dbe-aa88b1b2e978'
        }
    }
}
//===================================================================================================================================
export const LOG_PARSER_TEST_CASE_8 = {
    data: `2021-08-09T02:12:51.264Z - warn - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error","code":404,"err":"Cannot find user orders list"}`,
    logLevel:['error','warn'],
    expectation: {
        should: "should contain a correct log level ",
        value:{
            logLevel:'warn',
            transactionId:'9abc55b2-807b-4361-9dbe-aa88b1b2e978',
            err:'Service finished with error'
        }
    }
}
```

### Parser test cases

```typescript
export const PARSER_INPUT_TEST_CASE_1 = {
    data: {
        input: FIXTURE_BASE_PATH + '/fixture-input.log',
        output: FIXTURE_BASE_PATH + '/fixture-output.log',
        logLevel: ['error']
    },
    expectation: {
        should: "should return at least one log "
    }
}
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_2 = {
    data: {
        input: FIXTURE_BASE_PATH + '/fixture-input.log',
        output: FIXTURE_BASE_PATH + '/fixture-output.log',
        logLevel: ['error','debug']
    },
    expectation: {
        should: "should return a list of logs and has debug and error inside "
    }
}
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_3 = {
    data: {
        input: FIXTURE_BASE_PATH + '/fixture-input.log',
        output: FIXTURE_BASE_PATH + '/fixture-output.log',
        logLevel: ['unknown']
    },
    expectation: {
        should: "should return a list with 0 elements inside "
    }
}
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_4 = {
    data: {
        input: FIXTURE_BASE_PATH + '/fixture-input.log',
        output: FIXTURE_BASE_PATH + '/fixture-output.log',
        logLevel: ['error','warn','debug']
    },
    expectation: {
        should: "should return a list of logs and has debug, warn and error inside "
    }
}
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_5 = {
    data: {
        input: FIXTURE_BASE_PATH + '/fixture-input.log',
        output: FIXTURE_BASE_PATH + '/fixture-output.log',
        logLevel: ['error','warn','info','debug']
    },
    expectation: {
        should: "should return a list of logs and has debug, wanr, info and error inside "
    }
}
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_6 = {
    data: {
        input: FIXTURE_BASE_PATH + '/fixture-input.log',
        output: FIXTURE_BASE_PATH + '/fixture-output.log',
        logLevel: [datatype.string(20)]
    },
    expectation: {
        should: "should return a list with 0 elements inside "
    }
}
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_7 = {
    data: {
        input: FIXTURE_BASE_PATH + '/fixture-input.log',
        output: FIXTURE_BASE_PATH + '/fixture-output.log',
        logLevel: [datatype.number(345464)]
    },
    expectation: {
        should: "should throw error "
    }
}
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_8 = {
    data: {
        input: FIXTURE_BASE_PATH + '/fixture-input.log',
        output: FIXTURE_BASE_PATH + '/fixture-output.log',
        logLevel: [datatype.string(20),datatype.string(20),datatype.string(20)]
    },
    expectation: {
        should: "should return a list with 0 elements inside"
    }
}
```

### DTO test cases

```typescript
export const DTO_VALIDATION_TEST_CASE_1={
    data:{
        input:'input.log',
        output:'output.log',
        logLevel:['error','warn','info','debug']
    },
    expectation:{
        should:'should return ok'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_2={
    data:{
        input:'input.log',
        output:'output.log',
        logLevel:[]
    },
    expectation:{
        should:'should return ok'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_3={
    data:{
        input:datatype.string(5),
        output:'output.log',
        logLevel:['error']
    },
    expectation:{
        should:'should return ok'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_4={
    data:{
        input:datatype.string(5),
        output:datatype.string(5),
        logLevel:[]
    },
    expectation:{
        should:'should return ok'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_5={
    data:{
        input:datatype.number(5),
        output:datatype.number(5),
        logLevel:[]
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_6={
    data:{
        input:'input.log',
        output:'output.log',
        logLevel:[datatype.string(10)]
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_7={
    data:{
        input:'input.log',
        output:'output.log',
        logLevel:[datatype.number(200)]
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_8={
    data:{
        input:'input.log',
        output:'output.log',
        logLevel:datatype.number(200)
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_9={
    data:{
        input:'input.log',
        logLevel:datatype.number(200)
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_10={
    data:{
        output:'output.log',
        logLevel:datatype.number(200)
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_11={
    data:{
        logLevel:datatype.number(200)
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_12={
    data:{
        input:'input.log',
        output:'output.log',

    },
    expectation:{
        should:'should return ok'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_13={
    data:{
        input:true,
        output:'output.log',

    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_14={
    data:{
        input:'input.log',
        output:false,

    },
    expectation:{
        should:'should return error'
    }
}
```

### Command parser test cases

```typescript
export const PARSE_COMMAND_INTEGRATION_TEST_CASE_1 = {
  data: {
    comman: '*',
    args: {
        input: FIXTURE_BASE_PATH + '/fixture-input.log',
        output: FIXTURE_BASE_PATH + '/fixture-output.log',
      'log-level': 'debug',
    },
  },
  expectation: {
    should: 'should write parssed logs to the file',
  },
}
//=====================================================================================
export const PARSE_COMMAND_INTEGRATION_TEST_CASE_2 = {
    data: {
      comman: '*',
      args: {
          input: FIXTURE_BASE_PATH + '/fixture-input.log',
          output: FIXTURE_BASE_PATH + '/fixture-output.log',
        'log-level': 'error',
      },
    },
    expectation: {
      should: 'should write parssed logs to the file',
    },
  }
  //=====================================================================================
export const PARSE_COMMAND_INTEGRATION_TEST_CASE_3 = {
    data: {
      comman: '*',
      args: {
          input: FIXTURE_BASE_PATH + '/fixture-input.log',
          output: FIXTURE_BASE_PATH + '/fixture-output.log',
        'log-level': datatype.string(10),
      },
    },
    expectation: {
      should: 'should write parssed logs to the file',
    },
  }
  
```