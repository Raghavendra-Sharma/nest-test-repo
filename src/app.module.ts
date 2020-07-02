import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvertisersModule } from './advertisers/advertisers.module';
import { AdvertisementsModule } from './advertisements/advertisements.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-test-repo1'),
    AdvertisersModule,
    AdvertisementsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
