# MAYD Log parser

# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Provided Commands](#provided-commands)
  - [Code architecture](#code-architecture)
  - [source code](#source-code)
  - [Service build information](#service-build-information)
  - [Regular user](#regular-user)
  - [Documentation](#documentation)
  - [Example](#example)
  - [ToDo list](#todo-list)
    
    ## Overview
    
    Log parser takes a log input file and tries to parse it to extract useful information. It also respects [General Data Protection Regulation (GDPR)](https://gdpr-info.eu/)
    
    You can see take a look  at the Full documentation [here](https://github.com/MoeidHeidari/log-parser/blob/main/full-documentation.md)

---

#### Provided Commands

```bash
cli

parses a log file

Options:
  -h, --help       Show help                                           [boolean]
  -l, --log-level  log-level (ex: "error,[error,debug,warn,info]")
                                                     [string] [default: "error"]
  -o, --output     output log file (ex: "output.log")
                                     [string] [required] [default: "output.log"]
  -i, --input      input log file (ex: "input.log")          [string] [required]
  -v, --version    Show version number                                 [boolean]
```

---

## Code architecture

Onion Architecture

```bash
src
├── app
└── parser
    ├── command
    ├── common
    ├── dtos
    ├── enum
    ├── helper
    ├── model
    └── service
```

---

## source code

```bash
git clone https://github.com/MoeidHeidari/log-parser.git
cd log-parser
```

## Service build information

### Regular user

```bash
npm install
npm run build
npm run test
npm start:{dev || debug || prod}
```
test result

```bash
PASS  test/unit-tests/utils.spec.ts
PASS  test/unit-tests/filehelper.spec.ts
PASS  test/unit-tests/parser.service.spec.ts (5.093 s)
PASS  test/integration-tests/parser-command.spec.ts (5.418 s)
Test Suites: 4 passed, 4 total
Tests:       33 passed, 33 total
Snapshots:   0 total
Time:        5.732 s, estimated 6 s
Ran all test suites.
```

## Documentation

By running following comman you can generate the full code documentation (Compodoc) and get access to it through port `7000`

```bash
npm run doc
```

http://localhost:7000

## Example

input.log

```textile
2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}
2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request the user information","userId": 10}
2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request user orders list","userId": 10}
2021-08-09T02:12:51.255Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is started"}
2021-08-09T02:12:51.257Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"About to request the user information","userId": 16}
2021-08-09T02:12:51.257Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"User information is gathered","user":{"id":10,"name":"Alice"}}
2021-08-09T02:12:51.258Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"About to request user orders list","userId":16}
2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}
2021-08-09T02:12:51.259Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user": {"id": 16, "name": "Michael"}}
2021-08-09T02:12:51.262Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user":{"id":16,"orders":[{"id":472,"items":{"id":7,"price":7.12}}]}}
2021-08-09T02:12:51.264Z - warn - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error","code":404,"err":"Cannot find user orders list"}
2021-08-09T02:12:51.265Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is successfully finished"}
```

Run Log parser

```bash
npm run build
node dist/cli.js --input input.log --output log.json --log-level error,debug
Success 😀. output is written in log.json
```

output.json

```json
[
  {
    "timestamp": 1628475171254,
    "logLevel": "debug",
    "transactionId": "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
    "err": "About to request the user information"
  },
  {
    "timestamp": 1628475171254,
    "logLevel": "debug",
    "transactionId": "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
    "err": "About to request user orders list"
  },
  {
    "timestamp": 1628475171257,
    "logLevel": "debug",
    "transactionId": "9abc55b2-807b-4361-9dbe-aa88b1b2e821",
    "err": "About to request the user information"
  },
  {
    "timestamp": 1628475171257,
    "logLevel": "debug",
    "transactionId": "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
    "err": "User information is gathered"
  },
  {
    "timestamp": 1628475171258,
    "logLevel": "debug",
    "transactionId": "9abc55b2-807b-4361-9dbe-aa88b1b2e821",
    "err": "About to request user orders list"
  },
  {
    "timestamp": 1628475171259,
    "logLevel": "error",
    "transactionId": "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
    "err": "Cannot find user orders list"
  },
  {
    "timestamp": 1628475171259,
    "logLevel": "debug",
    "transactionId": "9abc55b2-807b-4361-9dbe-aa88b1b2e821",
    "err": "User information is retrieved"
  },
  {
    "timestamp": 1628475171262,
    "logLevel": "debug",
    "transactionId": "9abc55b2-807b-4361-9dbe-aa88b1b2e821",
    "err": "User information is retrieved"
  }
]
```

## ToDo list

- [ ] connect it to logstash
- [ ] implement elastic search

## 


