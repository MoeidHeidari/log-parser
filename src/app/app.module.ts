import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ParserModule } from '../parser/parser.module';



@Module({
  imports: [CommandModule,ParserModule,],
  providers: []
})
export class AppModule {}