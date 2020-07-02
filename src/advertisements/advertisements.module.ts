import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { AdvertisementSchema } from './schema/advertisement.schema';
import { AdvertisersModule } from 'src/advertisers/advertisers.module';
import { Advertiser } from 'src/advertisers/interface/advertiser.interface';
import { Model } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Advertisement',
        imports: [forwardRef(() => AdvertisersModule)],
        useFactory: (advertiserModel: Model<Advertiser>) => {
          const advertisementSchema = AdvertisementSchema;


          advertisementSchema.post('save', async function(){
            let advertiser = await advertiserModel.findById(this.advertiser);
            if(advertiser) {
              advertiser.advertisements.push(this._id);
              advertiser.save();
            }
          });

          advertisementSchema.post('findOneAndDelete', async function(doc){
            let advertiserId = doc.get('advertiser');
            let advertiser = await advertiserModel.findById(advertiserId);
            if(advertiser) {
              advertiser.advertisements = advertiser.advertisements.filter(ad => !(doc._id).equals(ad));
              advertiser.save();
            }
          });


          return advertisementSchema;
        },
        inject:[getModelToken('Advertiser')]
      }
    ]),
  ],
  exports: [MongooseModule],
  controllers: [],
  providers: []
})
export class AdvertisementsModule {}
