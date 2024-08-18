import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true })
export class Base extends Document{
  @Prop({ default: false })
  isDeleted: boolean;   
}

export const BaseSchema = SchemaFactory.createForClass(Base);