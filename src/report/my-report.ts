import { timeDurationFormat } from '../helper/report-helper';
import type {
  FullConfig, FullResult, Reporter, Suite, TestCase, TestResult
} from '@playwright/test/reporter';


class MyReporter implements Reporter {
    private countTest: number = 0;
    private passedTest: number = 0;
    private failedTest: number = 0;
    private flakyTest: number = 0;
    private testDuration: string = '0';


    onBegin(config: FullConfig, suite: Suite) {
        this.countTest = suite.allTests().length
        console.log(`Starting the run with ${suite.allTests().length} tests`);
    }

    onTestBegin(test: TestCase, result: TestResult) {
        console.log(`--- Starting test: ${test.title} ---`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        const testMaxRetry = test.retries;
        if (testMaxRetry == 0 || (testMaxRetry > 0 && result.retry == 0 && result.status == 'passed')) {
            console.log(`${test.title} - ${result.status.toUpperCase()}`)
            if (result.status == 'passed') {
                this.passedTest += 1
            } else {
                this.failedTest += 1
            }
        } else if (testMaxRetry > 0 && result.retry > 0 && result.status == 'passed') {
            console.log(`${test.title} - ${result.status.toUpperCase()}`)
            this.flakyTest += 1
        } else if (testMaxRetry > 0 && result.retry == testMaxRetry && result.status == 'failed') {
            console.log(`${test.title} - ${result.status.toUpperCase()}`)
            this.failedTest += 1
        }

    }

    onEnd(result: FullResult) {
        const duration = timeDurationFormat(result.duration);
        console.log(`===== Finished the run with result below ===== \nTest Count : ${this.countTest}\nPassed: ${this.passedTest}\nFail: ${this.failedTest}\nflaky : ${this.flakyTest}\nduration: ${duration}`);
    }
}

export default MyReporter;