import { Command, Positional, Option } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { ParserService } from '../service/parser.service'
import { ParserCommandDTO } from '../dtos/parser-command-dto'
import { validateDTO } from '../common';

@Injectable()
export class ParserCommand {
  constructor(private readonly parserService: ParserService) { }

  @Command({
    command: '*',
    describe: 'parses a log file',
  })
  async parse(
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
    try {
      let logFilter=log_level.split(',')
      let command = new ParserCommandDTO({ input: input, output: output, logLevel: logFilter });
      await validateDTO(command);
      this.parserService.parse(command).then((data) => {
        console.log(`Success! result is written in ${output}`);
      }).catch(error => {
        console.log("error happened");
      })
    } catch (error) {
      console.log(error);
      
    }

  }
}
