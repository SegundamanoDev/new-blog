import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SecretKeys } from './constants/keys.constant';
import { PostModule } from './routes/postroutes/post.module';
import { UserModule } from './routes/userroutes/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [PostModule, UserModule, AuthModule, MongooseModule.forRoot(SecretKeys.mongo_url)],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}

