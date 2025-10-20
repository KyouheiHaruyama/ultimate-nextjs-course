import {model, models, Schema, Types, Document} from "mongoose";

export interface IQuestion {
    title: string;
    content: string;
    tags: Types.ObjectId[];
    upvotes: number;
    downvotes: number;
    answers: number;
    views: number;
    author: Schema.Types.ObjectId;
}

export interface IQuestionDoc extends IQuestion, Document {}

const QuestionSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],

        upvotes: { type: Number, default: 0 },
        downvotes: { type: Number, default: 0 },
        answers: { type: Number, default: 0 },
        views: { type: Number, default: 0 },

        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    }, {
        timestamps: true
    }
);

const Question = models?.Question || model<IQuestion>('Question', QuestionSchema);

export default Question;