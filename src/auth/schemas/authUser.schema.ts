import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthUserDocument = HydratedDocument<AuthUser>;

@Schema({autoIndex: false,})
export class AuthUser {
  @Prop()
  _id: string;

  @Prop()
  rf: string;

  @Prop({default: new Date()})
  exp: Date
}


export const AuthUserSchema = SchemaFactory.createForClass(AuthUser).index({ exp: 1 }, { expires: '7d' })