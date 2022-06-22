import { Command, Positional, Option } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { ParserService } from '../service/parser.service'
import { ParserCommandDTO } from '../dtos/parser-command-dto'
import { validateDTO } from '../common'

/**
 * Log parser command
 */
@Injectable()
export class ParserCommand {
    /**
     * Constructs the Log parser command class
     * @param parserService Injection of parser service
     */
  constructor (private readonly parserService: ParserService) {}

  /**
   * Parser command that takes the input log file, parses and writes the result to the output file as ajson content.
   * @param input address of the input file
   * @param output address of the output file
   * @param log_level log level to be filtered
   * @returns LogModel[]
   */
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
