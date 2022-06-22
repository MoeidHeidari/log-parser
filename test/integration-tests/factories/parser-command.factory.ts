import * as path from 'path'
import faker, { datatype } from 'faker';
export const FIXTURE_BASE_PATH = path.resolve(__dirname, '../fixtures');
//=====================================================================================
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
  