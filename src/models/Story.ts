import { Schema, Document, model } from "mongoose"

export interface IStoryPost extends Document {
  by: string,
  score: Number,
  time: Number,
  title: string,
  url: string
}

const StorySchema: Schema = new Schema({
  by:{type: String},
  score: {type: Number},
  time: {type: Number},
  title: {type: String},
  url: {type: String},
})

export default model<IStoryPost>("Story", StorySchema);