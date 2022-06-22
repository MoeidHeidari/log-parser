import { datatype } from "faker"

export const DTO_VALIDATION_TEST_CASE_1={
    data:{
        input:'input.log',
        output:'output.log',
        logLevel:['error','warn','info','debug']
    },
    expectation:{
        should:'should return ok'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_2={
    data:{
        input:'input.log',
        output:'output.log',
        logLevel:[]
    },
    expectation:{
        should:'should return ok'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_3={
    data:{
        input:datatype.string(5),
        output:'output.log',
        logLevel:['error']
    },
    expectation:{
        should:'should return ok'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_4={
    data:{
        input:datatype.string(5),
        output:datatype.string(5),
        logLevel:[]
    },
    expectation:{
        should:'should return ok'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_5={
    data:{
        input:datatype.number(5),
        output:datatype.number(5),
        logLevel:[]
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_6={
    data:{
        input:'input.log',
        output:'output.log',
        logLevel:[datatype.string(10)]
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_7={
    data:{
        input:'input.log',
        output:'output.log',
        logLevel:[datatype.number(200)]
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_8={
    data:{
        input:'input.log',
        output:'output.log',
        logLevel:datatype.number(200)
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_9={
    data:{
        input:'input.log',
        logLevel:datatype.number(200)
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_10={
    data:{
        output:'output.log',
        logLevel:datatype.number(200)
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_11={
    data:{
        logLevel:datatype.number(200)
    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_12={
    data:{
        input:'input.log',
        output:'output.log',

    },
    expectation:{
        should:'should return ok'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_13={
    data:{
        input:true,
        output:'output.log',

    },
    expectation:{
        should:'should return error'
    }
}
//===========================================================================================
export const DTO_VALIDATION_TEST_CASE_14={
    data:{
        input:'input.log',
        output:false,

    },
    expectation:{
        should:'should return error'
    }
}