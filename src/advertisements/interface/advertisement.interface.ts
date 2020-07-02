import { Document } from 'mongoose';
import { Advertiser } from 'src/advertisers/interface/advertiser.interface';

export interface Advertisement extends Document {
    advertiser: string;
    contentUrl: string;
}