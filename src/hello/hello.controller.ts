import { Controller, Get, Param, Query } from '@nestjs/common';
import { HelloService } from './hello.service';
import { ConfigService } from '@nestjs/config';

// locahost:3000/hello

@Controller('hello')
export class HelloController {
    // dependency injection
    constructor(
        private readonly helloService: HelloService,
        private readonly configService: ConfigService
    ) { }

    @Get()
    getHello(): string {
        return this.helloService.getHello();
    }

    // localhost:3000/hello/user/maaitlunghau
    @Get('user/:name')
    getHelloWithName(@Param('name') name: string): string {
        return this.helloService.getHelloWithName(name);
    }

    // localhost:3000/hello/query?name=maaitlunghau
    @Get('query')
    getHelloWithQuery(@Query('name') name: string): string {
        return this.helloService.getHelloWithName(name || 'world');
    }

    @Get('app')
    getHelloApp() {
        const appName = this.configService.get<string>('APP_NAME', 'defaultName');
        return this.helloService.getHelloWithName(appName);
    }
}