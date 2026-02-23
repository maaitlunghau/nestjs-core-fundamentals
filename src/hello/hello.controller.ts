import { Controller, Get, Param, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

// locahost:3000/hello

@Controller('hello')
export class HelloController {
    // dependency injection
    constructor(private readonly helloService: HelloService) { }

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
}
