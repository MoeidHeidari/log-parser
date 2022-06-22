import { FileHelper } from "../../src/parser/helper";
import { LOG_PARSER_TEST_CASE_1, LOG_PARSER_TEST_CASE_2, LOG_PARSER_TEST_CASE_3, LOG_PARSER_TEST_CASE_4, LOG_PARSER_TEST_CASE_5, LOG_PARSER_TEST_CASE_6, LOG_PARSER_TEST_CASE_7, LOG_PARSER_TEST_CASE_8 } from './factories'

describe("tests the behavior of file helper class",()=>{

    let fileHelper = new FileHelper();
    //==================================================================================================================
    it(LOG_PARSER_TEST_CASE_1.expectation.should,async()=>{
        const result=await fileHelper.parsLog(LOG_PARSER_TEST_CASE_1.data,LOG_PARSER_TEST_CASE_1.logLevel);
        expect(result.timestamp).toEqual(LOG_PARSER_TEST_CASE_1.expectation.value.timestamp);
        expect(result.logLevel).toEqual(LOG_PARSER_TEST_CASE_1.expectation.value.logLevel);
        expect(result.transactionId).toEqual(LOG_PARSER_TEST_CASE_1.expectation.value.transactionId);
        expect(result.err).toEqual(LOG_PARSER_TEST_CASE_1.expectation.value.err);
    })
    //..................................................................................................................
    it(LOG_PARSER_TEST_CASE_2.expectation.should,async()=>{
        try {
            await fileHelper.parsLog(LOG_PARSER_TEST_CASE_2.data,LOG_PARSER_TEST_CASE_2.logLevel);
        } catch (error) {
            expect(error).toBeDefined();
        }
    })
    //..................................................................................................................
    it(LOG_PARSER_TEST_CASE_3.expectation.should,async()=>{
        try {
            await fileHelper.parsLog(LOG_PARSER_TEST_CASE_3.data,LOG_PARSER_TEST_CASE_3.logLevel);
        } catch (error) {
            expect(error).toBeDefined();
        }
    })
    //..................................................................................................................
    it(LOG_PARSER_TEST_CASE_4.expectation.should,async()=>{
        try {
            await fileHelper.parsLog(LOG_PARSER_TEST_CASE_4.data,LOG_PARSER_TEST_CASE_4.logLevel);
        } catch (error) {
            expect(error).toBeDefined();
        }
    })
    //..................................................................................................................
    it(LOG_PARSER_TEST_CASE_5.expectation.should,async()=>{
        const result=await fileHelper.parsLog(LOG_PARSER_TEST_CASE_5.data,LOG_PARSER_TEST_CASE_5.logLevel);
        expect(result).toBeUndefined();
    })
    //..................................................................................................................
    it(LOG_PARSER_TEST_CASE_6.expectation.should,async()=>{
        const result=await fileHelper.parsLog(LOG_PARSER_TEST_CASE_6.data,LOG_PARSER_TEST_CASE_6.logLevel);
        expect(result.logLevel).toEqual(LOG_PARSER_TEST_CASE_6.expectation.value.logLevel);
    })
    //..................................................................................................................
    it(LOG_PARSER_TEST_CASE_7.expectation.should,async()=>{
        const result=await fileHelper.parsLog(LOG_PARSER_TEST_CASE_7.data,LOG_PARSER_TEST_CASE_7.logLevel);
        expect(result.logLevel).toEqual(LOG_PARSER_TEST_CASE_7.expectation.value.logLevel);
        expect(result.transactionId).toEqual(LOG_PARSER_TEST_CASE_7.expectation.value.transactionId);
    })
    //..................................................................................................................
    it(LOG_PARSER_TEST_CASE_8.expectation.should,async()=>{
        const result=await fileHelper.parsLog(LOG_PARSER_TEST_CASE_8.data,LOG_PARSER_TEST_CASE_8.logLevel);
        expect(result.logLevel).toEqual(LOG_PARSER_TEST_CASE_8.expectation.value.logLevel);
        expect(result.transactionId).toEqual(LOG_PARSER_TEST_CASE_8.expectation.value.transactionId);
        expect(result.err).toEqual(LOG_PARSER_TEST_CASE_8.expectation.value.err);
    })
    //..................................................................................................................
    //..................................................................................................................
    //..................................................................................................................
    //..................................................................................................................
})

