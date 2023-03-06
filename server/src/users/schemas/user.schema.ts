import {Prop , Schema, SchemaFactory, raw , } from '@nestjs/mongoose'
import { HydratedDocument ,ObjectId, Types} from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {

    @Prop({type: Types.ObjectId , default: Types.ObjectId })
    _id: ObjectId
    
    @Prop(raw({
        f: { type: String , required: true},
        l: { type: String , required: true}
    }))
    name: Record<string, any>;

    @Prop({required: true})
    usn: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    pas: string;

}

export const UserSchema = SchemaFactory.createForClass(User);