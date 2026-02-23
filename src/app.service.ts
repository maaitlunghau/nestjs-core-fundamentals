import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) { }

  getHello(): string {
    return 'Hello World!';
  }

  getHelloAppName(): string {
    const appName = this.configService.get<string>('APP_NAME', 'defaultName');
    return `Hello ${appName}`;
  }
}
