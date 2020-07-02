import * as mongoose from 'mongoose';

export const AdvertiserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    advertisements: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Advertisement'}]
    // more properties here..
});