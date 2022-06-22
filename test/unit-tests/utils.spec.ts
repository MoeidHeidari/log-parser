import { validateDTO } from '../../src/parser/common';
import { ParserCommandDTO } from '../../src/parser/dtos/parser-command-dto';
import {
  DTO_VALIDATION_TEST_CASE_1,
  DTO_VALIDATION_TEST_CASE_10,
  DTO_VALIDATION_TEST_CASE_11,
  DTO_VALIDATION_TEST_CASE_12,
  DTO_VALIDATION_TEST_CASE_13,
  DTO_VALIDATION_TEST_CASE_14,
  DTO_VALIDATION_TEST_CASE_2,
  DTO_VALIDATION_TEST_CASE_3,
  DTO_VALIDATION_TEST_CASE_4,
  DTO_VALIDATION_TEST_CASE_5,
  DTO_VALIDATION_TEST_CASE_6,
  DTO_VALIDATION_TEST_CASE_7,
  DTO_VALIDATION_TEST_CASE_8,
  DTO_VALIDATION_TEST_CASE_9,
} from './factories';

describe('tests the functions inside utils file', () => {
  //==================================================================================================================
  it(DTO_VALIDATION_TEST_CASE_1.expectation.should, async () => {
    const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_1.data);
    await validateDTO(dto);
    expect(dto.input).toBeDefined();
  });
  //..................................................................................................................
  it(DTO_VALIDATION_TEST_CASE_2.expectation.should, async () => {
    const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_2.data);
    await validateDTO(dto);
    expect(dto.input).toBeDefined();
  });
  //..................................................................................................................
  it(DTO_VALIDATION_TEST_CASE_3.expectation.should, async () => {
    const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_3.data);
    await validateDTO(dto);
    expect(dto.input).toBeDefined();
  });
  //..................................................................................................................
  it(DTO_VALIDATION_TEST_CASE_4.expectation.should, async () => {
    const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_4.data);
    await validateDTO(dto);
    expect(dto.input).toBeDefined();
  });
  //..................................................................................................................
  it(DTO_VALIDATION_TEST_CASE_5.expectation.should, async () => {
    try {
      const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_5.data);
      await validateDTO(dto);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  //..................................................................................................................
  it(DTO_VALIDATION_TEST_CASE_6.expectation.should, async () => {
    try {
      const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_6.data);
      await validateDTO(dto);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  //..................................................................................................................
  it(DTO_VALIDATION_TEST_CASE_7.expectation.should, async () => {
    try {
      const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_7.data);
      await validateDTO(dto);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  //..................................................................................................................
  it(DTO_VALIDATION_TEST_CASE_8.expectation.should, async () => {
    try {
      const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_8.data);
      await validateDTO(dto);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  //..................................................................................................................
  it(DTO_VALIDATION_TEST_CASE_9.expectation.should, async () => {
    try {
      const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_9.data);
      await validateDTO(dto);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  //..................................................................................................................
  it(DTO_VALIDATION_TEST_CASE_10.expectation.should, async () => {
    try {
      const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_10.data);
      await validateDTO(dto);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  //..................................................................................................................
  it(DTO_VALIDATION_TEST_CASE_11.expectation.should, async () => {
    try {
      const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_11.data);
      await validateDTO(dto);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  //..................................................................................................................
  it(DTO_VALIDATION_TEST_CASE_12.expectation.should, async () => {
    const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_12.data);
    await validateDTO(dto);
    expect(dto.input).toBeDefined();
  });
  //..................................................................................................................
  it(DTO_VALIDATION_TEST_CASE_13.expectation.should, async () => {
    try {
      const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_13.data);
      await validateDTO(dto);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  //..................................................................................................................
  it(DTO_VALIDATION_TEST_CASE_14.expectation.should, async () => {
    try {
      const dto = new ParserCommandDTO(DTO_VALIDATION_TEST_CASE_14.data);
      await validateDTO(dto);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  //..................................................................................................................
});
