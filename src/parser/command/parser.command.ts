import { Command, Positional, Option } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { ParserService } from '../service/parser.service'

@Injectable()
export class ParserCommand {
  constructor (private readonly parserService: ParserService) {}

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
      default: "output.log",
      required: true,
    })
    output: string,
    @Option({
        name: 'log-level',
        describe: 'log-level (ex: "error,[error,debug,warn,info]")',
        type: 'string',
        alias: 'l',
        default: "error",
        required: false,
      })
      log_level: string,
  ) {
    this.parserService.parse({
        input,
        output,
        log_level,
    })
  }
}
