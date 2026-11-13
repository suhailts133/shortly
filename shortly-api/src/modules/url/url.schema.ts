import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Url {
  @Prop({ required: true, unique: true })
  originalUrl!: string;

  @Prop({ required: true })
  shortUrl!: string;

  @Prop({ required: true, unique: true })
  shortId!: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId!: mongoose.Types.ObjectId;

  @Prop()
  createdAt!: Date;
}

export type UrlDocument = HydratedDocument<Url>;
export const UrlSchema = SchemaFactory.createForClass(Url);
