import { Module } from '@nestjs/common';
import { ParserCommand } from './command/parser.command';
import { FileHelper } from './helper';
import { ParserService } from './service/parser.service';


@Module({
  imports: [],
  providers: [ParserCommand, ParserService,{
    provide:"FILE_HELPER",
    useClass:FileHelper

  }]
})
export class ParserModule {}