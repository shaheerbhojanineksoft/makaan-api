import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LawyerAccountDocument = HydratedDocument<LawyerAccount>;

@Schema({ collection: 'users', versionKey: false })
export class LawyerAccount {
  @Prop({ default: '' })
  Bio!: string;

  @Prop({ default: '' })
  SpecialistIn!: string;

  @Prop({ default: '' })
  fullname!: string;

  @Prop({ default: '' })
  location!: string;

  @Prop({ default: '' })
  profilePicture!: string;

  @Prop({ default: '' })
  phonenumber!: string;

  @Prop({ default: '' })
  whatsappNumber!: string;

  @Prop({ default: false })
  registered!: boolean;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email!: string;

  @Prop({ default: false })
  isProfileCompleted!: boolean;

  @Prop({ required: true })
  createdOn!: Date;

  @Prop({ required: true })
  modifiedOn!: Date;
}

export const LawyerAccountSchema = SchemaFactory.createForClass(LawyerAccount);
