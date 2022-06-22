import { validateDTO } from "../../src/parser/common"
import { ParserCommandDTO } from "../../src/parser/dtos/parser-command-dto";
import { DTO_VALIDATION_TEST_CASE_1 } from "./factories";

describe("tests the functions inside utils file", () => {
    //==================================================================================================================
    it(DTO_VALIDATION_TEST_CASE_1.expectation.should, async () => {
        const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_1.data);
        await validateDTO(dto);
        expect(dto.input).toBeDefined();
    })
    //..................................................................................................................
    //..................................................................................................................
    //..................................................................................................................
    //..................................................................................................................
})