import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

@Module({
    controllers: [HelloController],
    providers: [HelloService],
    imports: [], // import other modules if needed
    exports: [] // export services (providers) if needed in other module
})
export class HelloModule { }
