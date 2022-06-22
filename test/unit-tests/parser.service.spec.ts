import * as fs from 'fs';
import { ParserCommandDTO } from "../../src/parser/dtos/parser-command-dto";
import { FileHelper } from "../../src/parser/helper";
import { ParserService } from "../../src/parser/service/parser.service";
import {
    FIXTURE_BASE_PATH,
    PARSER_INPUT_TEST_CASE_1,
    PARSER_INPUT_TEST_CASE_2,
    PARSER_INPUT_TEST_CASE_3,
    PARSER_INPUT_TEST_CASE_4,
    PARSER_INPUT_TEST_CASE_5,
    PARSER_INPUT_TEST_CASE_6,
    PARSER_INPUT_TEST_CASE_7,
    PARSER_INPUT_TEST_CASE_8
} from './factories'


describe("tests the behavior of parser service class", () => {
    let fileHelper = new FileHelper();
    let service = new ParserService(fileHelper);
    //==================================================================================================================
    it(PARSER_INPUT_TEST_CASE_1.expectation.should, async () => {
        const result = await service.parse(new ParserCommandDTO(PARSER_INPUT_TEST_CASE_1.data));
        expect(result.length).toBeGreaterThan(0);
    })
    //..................................................................................................................
    it(PARSER_INPUT_TEST_CASE_2.expectation.should, async () => {
        const result = await service.parse(new ParserCommandDTO(PARSER_INPUT_TEST_CASE_2.data));
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'debug')).length).toBeGreaterThan(0);
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'error')).length).toBeGreaterThan(0);
    })
    //..................................................................................................................
    it(PARSER_INPUT_TEST_CASE_3.expectation.should, async () => {
        const result = await service.parse(new ParserCommandDTO(PARSER_INPUT_TEST_CASE_3.data));
        expect(await result.length).toEqual(0);
    })
    //..................................................................................................................
    it(PARSER_INPUT_TEST_CASE_4.expectation.should, async () => {
        const result = await service.parse(new ParserCommandDTO(PARSER_INPUT_TEST_CASE_4.data));
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'warn')).length).toBeGreaterThan(0);
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'error')).length).toBeGreaterThan(0);
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'debug')).length).toBeGreaterThan(0);
    })
    //..................................................................................................................
    it(PARSER_INPUT_TEST_CASE_5.expectation.should, async () => {
        const result = await service.parse(new ParserCommandDTO(PARSER_INPUT_TEST_CASE_5.data));
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'warn')).length).toBeGreaterThan(0);
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'error')).length).toBeGreaterThan(0);
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'debug')).length).toBeGreaterThan(0);
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'info')).length).toBeGreaterThan(0);
    })
    //..................................................................................................................
    it(PARSER_INPUT_TEST_CASE_6.expectation.should, async () => {
        const result = await service.parse(new ParserCommandDTO(PARSER_INPUT_TEST_CASE_6.data));
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'warn')).length).toEqual(0);
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'error')).length).toEqual(0);
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'debug')).length).toEqual(0);
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'info')).length).toEqual(0);
    })
    //..................................................................................................................
    it(PARSER_INPUT_TEST_CASE_7.expectation.should, async () => {
        try {
            await service.parse(new ParserCommandDTO(PARSER_INPUT_TEST_CASE_7.data));
        } catch (error) {
            expect(error).toBeDefined();
        }
    })
    //..................................................................................................................
    it(PARSER_INPUT_TEST_CASE_8.expectation.should, async () => {
        const result = await service.parse(new ParserCommandDTO(PARSER_INPUT_TEST_CASE_8.data));
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'warn')).length).toEqual(0);
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'error')).length).toEqual(0);
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'debug')).length).toEqual(0);
        expect((await result.filter((log: { logLevel: string; }) => log.logLevel === 'info')).length).toEqual(0);
    })
    //..................................................................................................................
    //==================================================================================================================
    afterAll(() => {
        fs.unlinkSync(FIXTURE_BASE_PATH + '/fixture-output.log');
    })

})