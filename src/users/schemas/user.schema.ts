import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserAccountDocument = HydratedDocument<UserAccount>;

@Schema({ collection: 'users', versionKey: false })
export class UserAccount {
  @Prop({ default: '' })
  profilePicture!: string;

  @Prop({ default: '' })
  fullname!: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email!: string;

  @Prop({ default: '' })
  phoneNumber!: string;

  @Prop({ default: false })
  isProfileCompleted!: boolean;

  @Prop({ required: true })
  createdOn!: Date;

  @Prop({ required: true })
  modifiedOn!: Date;
}

export const UserAccountSchema = SchemaFactory.createForClass(UserAccount);
