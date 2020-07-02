import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { AdvertiserSchema } from './schema/advertiser.schema';
import { AdvertisementsModule } from 'src/advertisements/advertisements.module';
import { Advertisement } from 'src/advertisements/interface/advertisement.interface';
import { Model } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Advertiser',
        imports: [forwardRef(() => AdvertisementsModule)],
        useFactory: (advertisementModel: Model<Advertisement>) => {
          const advertiserSchema = AdvertiserSchema;

          advertiserSchema.post('findOneAndDelete', async function(doc){
            await advertisementModel.deleteMany({ advertiser: doc._id });
          });

          return advertiserSchema;
        },
        inject: [getModelToken('Advertisement')]
      }
    ]),
  ],
  exports: [MongooseModule],
  controllers: [],
  providers: []
})
export class AdvertisersModule {}
