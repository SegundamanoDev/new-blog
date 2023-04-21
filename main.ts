import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Open Api for my web')
  .setDescription('Swagger Api that serve as a frontend for crud operation')
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const Port = 3000
  await app.listen(Port, function(){
    console.log(`Server is listenning for request on port ${Port}`)
  });
  
}
bootstrap();
