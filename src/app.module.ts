import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import Joi from 'joi';

// root module: use all the sub modules

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('defaultApp')
      }),
    }),
    HelloModule,
    UserModule,
    PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
