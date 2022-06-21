import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ParserCommand } from './command/parser.command';
import { ParserService } from './service/parser.service';


@Module({
  imports: [],
  providers: [ParserCommand, ParserService]
})
export class ParserModule {}