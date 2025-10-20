import {model, models, Schema} from "mongoose";

export interface IModel {}

const ModelSchema = new Schema({}, { timestamps: true });

const Model = models.Model || model<IModel>("Model", ModelSchema);

export default Model;