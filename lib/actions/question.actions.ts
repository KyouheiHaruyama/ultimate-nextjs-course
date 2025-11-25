"use server";



import {ActionResponse, ErrorResponse, Question} from "@/types/global";
import action from "@/lib/handlers/action";
import {AskQuestionSchema, EditQuestionSchema, GetQuestionSchema} from "@/lib/validations";
import handleError from "@/lib/handlers/error";
import mongoose from "mongoose";
import QuestionModel from "@/database/models/question.models";
import Tag, {ITagDoc} from "@/database/models/tag.models";
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
    session.startTransaction();

    try {
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

export async function editQuestion  (params: EditQuestionParams): Promise<ActionResponse<Question>> {
    const validationResult = await action({
        params,
        schema: EditQuestionSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { title, content, tags, questionId } = validationResult.params!;
    const userId = validationResult?.session?.user?.id;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Question 内容の更新
        const question = await QuestionModel.findById(questionId).populate('tags');
        if (!question) throw new Error('Question not found');

        if (question.author.toString() !== userId) throw new Error('Unauthorized');

        if (question.title !== title || question.content !== content) {
            question.title = title;
            question.content = content;
            await question.save({ session });
        }

        const tagsToAdd = tags.filter(
            (tag) => !question.tags.includes(tag.toLowerCase())
        );

        const tagsToRemove = question.tags.filter(
            (tag: ITagDoc) => !tags.includes(tag.name.toLowerCase())
        );

        // タグの登録
        const newTagDocuments = [];
        if (tagsToAdd.length > 0) {
            for (const tag of tagsToAdd) {
                const existingTag = await Tag.findOneAndUpdate(
                    { name: { $regex: new RegExp(`^${tag}$`, "i") } },
                    { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
                    { upsert: true, new: true, session }
                );

                if (existingTag) {
                    newTagDocuments.push({
                        tag: existingTag._id,
                        question: questionId,
                    });

                    question.tags.push(existingTag._id);
                }
            }
        }

        // タグの削除
        if (tagsToRemove.length > 0) {
            const tagIdsToRemove = tagsToRemove.map((tag: ITagDoc) => tag._id);
            await Tag.updateMany(
                { _id: { $in: tagIdsToRemove } },
                { $inc: { questions: -1 } },
                { session }
            );

            await TagQuestion.deleteMany(
                { question: questionId, tag: { $in: tagIdsToRemove }},
                { session }
            );

            question.tags = question.tags.filter(
                (tagId: mongoose.Types.ObjectId) => !tagIdsToRemove.includes(tagId)
            );
        }

        if (newTagDocuments.length > 0) {
            await TagQuestion.insertMany(newTagDocuments, { session });
        }

        await question.save();
        await session.commitTransaction();

        return { success: true, data: JSON.parse(JSON.stringify(question)) };
    } catch (error) {
        await session.abortTransaction();
        return handleError(error) as ErrorResponse;
    } finally {
        await session.endSession();
    }
}

export async function getQuestion  (params: GetQuestionsParams): Promise<ActionResponse<Question>> {
    const validationResult = await action({
        params,
        schema: GetQuestionSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { questionId } = validationResult.params!;

    try {
        const question = await QuestionModel.findById(questionId).populate('tags');
        if (!question) throw new Error('Question not found');

        return { success: true, data: JSON.parse(JSON.stringify(question)) };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
}

// Server Actions are designed to be used in different contexts.
// 1. In Server Components: They act like regular async functions.
// 2. In Client Components: When used in form actions or event handlers, they are invoked via a POST request.

// It's a Direct Invocation. When you use a Server Action in a Server Component,
// you're directly calling the function on the server.
// There's no HTTP request involved at all because both the Server Component and the Server Action are executing
// in the same server environment.

// サーバーアクションは、異なるコンテキストで使用されるように設計されています。
// 1. サーバーコンポーネント内：通常の非同期関数のように動作します。
// 2. クライアントコンポーネント内：フォームアクションやイベントハンドラーで使用される場合、POSTリクエストを介して呼び出されます。

// これは直接呼び出しです。サーバーコンポーネント内でサーバーアクションを使用する場合、
// サーバー上で関数を直接呼び出しています。
// サーバーコンポーネントとサーバーアクションの両方が同じサーバー環境で実行されるため、
// HTTPリクエストは一切発生しません。