import { Document } from 'mongoose';
import { Advertisement } from 'src/advertisements/interface/advertisement.interface';

export interface Advertiser extends Document {
    name: string;
    advertisements?: string[];
}