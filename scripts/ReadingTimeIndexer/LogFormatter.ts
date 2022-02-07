import { ILogger } from './ILogger';

export class LogFormatter implements ILogger {
  public constructor(private readonly suffix: string) {}

  public log(message: string) {
    console.log(`${this.suffix}/INFO: ${message}`);
  }

  public warn(message: string) {
    console.warn(`${this.suffix}/WARN: ${message}`);
  }

  public error(message: string) {
    console.error(`${this.suffix}/ERROR: ${message}`);
  }
}
