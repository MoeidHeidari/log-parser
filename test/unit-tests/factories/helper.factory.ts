import { datatype } from "faker"

export const LOG_PARSER_TEST_CASE_1 = {
    data: `2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}`,
    logLevel:['info'],
    expectation: {
        should: "should return log object that matches the object in this test case ",
        value:{
            timestamp:2354321571253,
            logLevel:'info',
            transactionId:'9abc55b2-807b-4361-9dbe-aa88b1b2e978',
            err:'Service is started'
        }
    }
}

export const LOG_PARSER_TEST_CASE_2 = {
    data: datatype.string(500),
    logLevel:['info','error','debug','warn'],
    expectation: {
        should: "should throw not acceptable exception "
    }
}

export const LOG_PARSER_TEST_CASE_3 = {
    data: `2021-08-09T02:12:51.254Z - debug -`,
    logLevel:['info','error','debug','warn'],
    expectation: {
        should: "should throw not acceptable exception"
    }
}

export const LOG_PARSER_TEST_CASE_4 = {
    data: `2021-08-09T02:12:51. - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request the user information","userId": 10}
    2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request user orders list","userId": 10}`,
    logLevel:['info','error','debug','warn'],
    expectation: {
        should: "should throw not acceptable exception"
    }
}

export const LOG_PARSER_TEST_CASE_5 = {
    data: `2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}`,
    logLevel:[datatype.string(5)],
    expectation: {
        should: "should return log object that matches the object in this test case ",
        value:undefined
    }
}

export const LOG_PARSER_TEST_CASE_6 = {
    data: `2021-08-09T02:12:51.262Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user":{"id":16,"orders":[{"id":472,"items":{"id":7,"price":7.12}}]}}`,
    logLevel:['debug'],
    expectation: {
        should: "should contain a correct log level ",
        value:{
            logLevel:'debug'
        }
    }
}

export const LOG_PARSER_TEST_CASE_7 = {
    data: `2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}`,
    logLevel:['error'],
    expectation: {
        should: "should contain a correct log level ",
        value:{
            logLevel:'error',
            transactionId:'9abc55b2-807b-4361-9dbe-aa88b1b2e978'
        }
    }
}

export const LOG_PARSER_TEST_CASE_8 = {
    data: `2021-08-09T02:12:51.264Z - warn - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error","code":404,"err":"Cannot find user orders list"}`,
    logLevel:['error','warn'],
    expectation: {
        should: "should contain a correct log level ",
        value:{
            logLevel:'warn',
            transactionId:'9abc55b2-807b-4361-9dbe-aa88b1b2e978',
            err:'Service finished with error'
        }
    }
}