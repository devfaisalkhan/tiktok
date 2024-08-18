import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Base } from "src/universal/base.schema";

@Schema({})
export class User extends Base {
    
    @Prop({unique: true})
    username: string;

    @Prop()
    name: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
