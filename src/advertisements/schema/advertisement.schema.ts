import * as mongoose from 'mongoose';

export const AdvertisementSchema = new mongoose.Schema({
    advertiser: { type: mongoose.SchemaTypes.ObjectId, ref: 'Advertiser', required: true },
    contentUrl: { type: String, required: true }
    // more properties here..
});
