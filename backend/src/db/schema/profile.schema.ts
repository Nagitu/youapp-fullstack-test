import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, {  HydratedDocument } from "mongoose";
import { User } from "./user.schema";

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
    // @Prop({ type: String, ref: 'User', required: true })
    // user_id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'  })
    user: User;

    @Prop()
    birthday: Date;
  
    @Prop()
    zodiac: string;

    @Prop()
    gender: string;

    @Prop()
    height: number;

    @Prop()
    weight: number;

    @Prop()
    about:string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)