import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type AuthUserDocument = HydratedDocument<AuthUser>;

@Schema({autoIndex: false,})
export class AuthUser {
  @Prop({type: Types.ObjectId})
  _id: ObjectId;

  @Prop({required: true})
  rf: string;

  @Prop({default: new Date()})
  exp: Date
}


export const AuthUserSchema = SchemaFactory.createForClass(AuthUser).index({ exp: 1 }, { expires: '7d' })