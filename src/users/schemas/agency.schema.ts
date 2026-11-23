import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AgencyAccountDocument = HydratedDocument<AgencyAccount>;

@Schema({ collection: 'users', versionKey: false })
export class AgencyAccount {
  @Prop({ default: '' })
  name!: string;

  @Prop({ default: '' })
  agency!: string;

  @Prop({ default: '' })
  city!: string;

  @Prop({ default: '' })
  phone!: string;

  @Prop({ default: '' })
  whatsapp!: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email!: string;

  @Prop({ default: '' })
  officeAddress!: string;

  @Prop({ default: '' })
  bio!: string;

  @Prop({ default: '' })
  profilePicture!: string;

  @Prop({ default: '' })
  coverImage!: string;

  @Prop({ default: '' })
  licenseNumber!: string;

  @Prop({ default: '' })
  responseTime!: string;

  @Prop({ default: 0 })
  experienceYears!: number;

  @Prop({ default: 0 })
  teamSize!: number;

  @Prop({ type: [String], default: [] })
  specializations!: string[];

  @Prop({ type: [String], default: [] })
  areasServed!: string[];

  @Prop({ type: [String], default: [] })
  services!: string[];

  @Prop({ default: false })
  isProfileCompleted!: boolean;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ required: true })
  createdOn!: Date;

  @Prop({ required: true })
  modifiedOn!: Date;
}

export const AgencyAccountSchema = SchemaFactory.createForClass(AgencyAccount);
