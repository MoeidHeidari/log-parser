import { datatype } from 'faker';
import * as path from 'path';

export const FIXTURE_BASE_PATH = path.resolve(__dirname, '../fixtures');
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_1 = {
  data: {
    input: FIXTURE_BASE_PATH + '/fixture-input.log',
    output: FIXTURE_BASE_PATH + '/fixture-output.log',
    logLevel: ['error'],
  },
  expectation: {
    should: 'should return at least one log ',
  },
};
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_2 = {
  data: {
    input: FIXTURE_BASE_PATH + '/fixture-input.log',
    output: FIXTURE_BASE_PATH + '/fixture-output.log',
    logLevel: ['error', 'debug'],
  },
  expectation: {
    should: 'should return a list of logs and has debug and error inside ',
  },
};
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_3 = {
  data: {
    input: FIXTURE_BASE_PATH + '/fixture-input.log',
    output: FIXTURE_BASE_PATH + '/fixture-output.log',
    logLevel: ['unknown'],
  },
  expectation: {
    should: 'should return a list with 0 elements inside ',
  },
};
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_4 = {
  data: {
    input: FIXTURE_BASE_PATH + '/fixture-input.log',
    output: FIXTURE_BASE_PATH + '/fixture-output.log',
    logLevel: ['error', 'warn', 'debug'],
  },
  expectation: {
    should:
      'should return a list of logs and has debug, warn and error inside ',
  },
};
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_5 = {
  data: {
    input: FIXTURE_BASE_PATH + '/fixture-input.log',
    output: FIXTURE_BASE_PATH + '/fixture-output.log',
    logLevel: ['error', 'warn', 'info', 'debug'],
  },
  expectation: {
    should:
      'should return a list of logs and has debug, wanr, info and error inside ',
  },
};
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_6 = {
  data: {
    input: FIXTURE_BASE_PATH + '/fixture-input.log',
    output: FIXTURE_BASE_PATH + '/fixture-output.log',
    logLevel: [datatype.string(20)],
  },
  expectation: {
    should: 'should return a list with 0 elements inside ',
  },
};
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_7 = {
  data: {
    input: FIXTURE_BASE_PATH + '/fixture-input.log',
    output: FIXTURE_BASE_PATH + '/fixture-output.log',
    logLevel: [datatype.number(345464)],
  },
  expectation: {
    should: 'should throw error ',
  },
};
//=====================================================================================
export const PARSER_INPUT_TEST_CASE_8 = {
  data: {
    input: FIXTURE_BASE_PATH + '/fixture-input.log',
    output: FIXTURE_BASE_PATH + '/fixture-output.log',
    logLevel: [datatype.string(20), datatype.string(20), datatype.string(20)],
  },
  expectation: {
    should: 'should return a list with 0 elements inside',
  },
};
