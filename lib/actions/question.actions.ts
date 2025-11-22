"use server";



import {ActionResponse, ErrorResponse, Question} from "@/types/global";
import action from "@/lib/handlers/action";
import {AskQuestionSchema} from "@/lib/validations";
import handleError from "@/lib/handlers/error";
import mongoose from "mongoose";
import QuestionModel from "@/database/models/question.models";
import Tag from "@/database/models/tag.models";
import TagQuestion from "@/database/models/tag-question.models";

export async function createQuestion (params: CreateQuestionParams): Promise<ActionResponse<Question>> {
    const validationResult = await action({
        params,
        schema: AskQuestionSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { title, content, tags } = validationResult.params!;
    const userId = validationResult?.session?.user?.id;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const [question] = await QuestionModel.create([{ title, content, author: userId }], { session });
        if (!question) throw new Error('Failed to create question');

        const tagIds: mongoose.Types.ObjectId[] = [];
        const tagQuestionDocuments = [];

        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, "i") } },
                { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
                { upsert: true, new: true, session }
            );

            tagIds.push(existingTag._id);
            tagQuestionDocuments.push({
                tag: existingTag._id,
                question: question._id,
            });
        }

        await TagQuestion.insertMany(tagQuestionDocuments, { session });

        await QuestionModel.findByIdAndUpdate(
            question._id,
            { $push: { tags: { $each: tagIds }}},
            { session }
        );

        await session.commitTransaction();

        return { success: true, data: JSON.parse(JSON.stringify(question)) };
    } catch (error) {
        await session.abortTransaction();
        return handleError(error) as ErrorResponse;
    } finally {
        await session.endSession();
    }
}