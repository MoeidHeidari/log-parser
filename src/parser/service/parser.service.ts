import { Injectable } from '@nestjs/common';

@Injectable()
export class ParserService {
  async parse(user: any): Promise<any> {
    return Promise.resolve().then(() => {
      console.log('parser executed', user);
    });
  }
}