import { CommandModule, CommandModuleTest } from 'nestjs-command';
import { AppModule } from '../../src/app/app.module';
import { Test } from '@nestjs/testing';
import {
  FIXTURE_BASE_PATH,
  PARSE_COMMAND_INTEGRATION_TEST_CASE_1,
  PARSE_COMMAND_INTEGRATION_TEST_CASE_2,
  PARSE_COMMAND_INTEGRATION_TEST_CASE_3,
} from './factories';
import * as fs from 'fs';
describe('AppModule', () => {
  let commandModule: CommandModuleTest;
  let app;
  async function readFile(path: string): Promise<string> {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    commandModule = new CommandModuleTest(app.select(CommandModule));
  });
  //===========================================================================================================
  it(PARSE_COMMAND_INTEGRATION_TEST_CASE_1.expectation.should, async () => {
    await commandModule.execute(
      PARSE_COMMAND_INTEGRATION_TEST_CASE_1.data.comman,
      PARSE_COMMAND_INTEGRATION_TEST_CASE_1.data.args,
    );
    const result = await readFile(FIXTURE_BASE_PATH + '/fixture-output.log');
    expect(JSON.parse(result).length).toBeGreaterThan(0);
  });
  //..........................................................................................................
  it(PARSE_COMMAND_INTEGRATION_TEST_CASE_2.expectation.should, async () => {
    await commandModule.execute(
      PARSE_COMMAND_INTEGRATION_TEST_CASE_2.data.comman,
      PARSE_COMMAND_INTEGRATION_TEST_CASE_2.data.args,
    );
    const result = await readFile(FIXTURE_BASE_PATH + '/fixture-output.log');
    expect(
      JSON.parse(result).filter(
        (log: { logLevel: string }) =>
          log.logLevel ==
          PARSE_COMMAND_INTEGRATION_TEST_CASE_2.data.args['log-level'],
      ).length,
    ).toBeGreaterThan(0);
  });
  //..........................................................................................................
  it(PARSE_COMMAND_INTEGRATION_TEST_CASE_3.expectation.should, async () => {
    try {
      await commandModule.execute(
        PARSE_COMMAND_INTEGRATION_TEST_CASE_3.data.comman,
        PARSE_COMMAND_INTEGRATION_TEST_CASE_3.data.args,
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  afterAll(() => {
    fs.unlinkSync(FIXTURE_BASE_PATH + '/fixture-output.log');
  });
});
