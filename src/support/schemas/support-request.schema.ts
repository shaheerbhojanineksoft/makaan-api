import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SupportRequestDocument = HydratedDocument<SupportRequest>;

export const SUPPORT_STATUS = [
  'pending',
  'in_review',
  'responded',
] as const;
export type SupportStatus = (typeof SUPPORT_STATUS)[number];

@Schema({
  collection: 'support_request_from_agency',
  versionKey: false,
  id: false,
})
export class SupportRequest {
  @Prop({ required: true, type: Types.ObjectId, index: true })
  agencyId!: Types.ObjectId;

  @Prop({ required: true, trim: true })
  subject!: string;

  @Prop({ required: true, trim: true })
  topic!: string;

  @Prop({ required: true, trim: true })
  message!: string;

  @Prop({ type: [String], default: [] })
  attachments!: string[];

  @Prop({ required: true, trim: true })
  phone!: string;

  @Prop({ default: 'pending', enum: SUPPORT_STATUS })
  status!: SupportStatus;

  @Prop({ default: '' })
  response!: string;

  @Prop({ required: true })
  createdAt!: Date;

  @Prop({ required: true })
  updatedAt!: Date;
}

export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);
