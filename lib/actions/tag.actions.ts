import action from "@/lib/handlers/action";
import {GetTagQuestionsSchema, PaginatedSearchParamsSchema} from "@/lib/validations";
import handleError from "@/lib/handlers/error";
import {FilterQuery} from "mongoose";
import {Question, Tag} from "@/database";

export const getTags = async (
    params: PaginatedSearchParams
): Promise<ActionResponse<{ tags: Tag[]; isNext: boolean }>> => {
    const validationResult = await action({
        params,
        schema: PaginatedSearchParamsSchema
    });

    if (validationResult instanceof Error) return handleError(validationResult) as ErrorResponse;

    const { page = 1, pageSize = 10, query, filter } = params;
    const skip = (Number(page) - 1) * pageSize;
    const limit = Number(pageSize);
    const filterQuery: FilterQuery<typeof Tag> = {};

    if (query) {
        filterQuery.$or = [{
            name: { $regex: query, $options: "i" },
        }]
    }

    let sortCriteria = {};
    switch (filter) {
        case "popular":
            sortCriteria = { questions: -1 };
            break;
        case "recent":
            sortCriteria = { createdAt: -1 };
            break;
        case "oldest":
            sortCriteria = { createdAt: 1 };
            break;
        case "name":
            sortCriteria = { name: 1 };
            break;
        default:
            break;
    }

    try {
        const totalTags = await Tag.countDocuments(filterQuery);
        const tags = await Tag.find(filterQuery).sort(sortCriteria).skip(skip).limit(limit);
        const isNext = totalTags < skip + tags.length;

        return {
            success: true,
            data: {
                tags: JSON.parse(JSON.stringify(tags)),
                isNext
            }
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

// Questionsモデルを呼び出し、このタグを含む質問を検索する
// TagQuestionsモデルを呼び出し、指定されたタグを含む異なるドキュメントを検索することで、関連する質問をまとめて取得する
export const getTagQuestions = async (
    params: GetTagQuestionsParams
): Promise<ActionResponse<{ tag: Tag; questions: Question[], isNext: boolean }>> => {
    const validationResult = await action({
        params,
        schema: GetTagQuestionsSchema
    });

    if (validationResult instanceof Error) return handleError(validationResult) as ErrorResponse;

    const { tagId, page = 1, pageSize = 10, query } = params;
    const skip = (Number(page) - 1) * pageSize;
    const limit = Number(pageSize);


    try {
        const tag = await Tag.findById(tagId);
        if (!tag) throw new Error('Tag not found');

        const filterQuery: FilterQuery<typeof Question> = {
            tags: { $in: [tagId] }
        };

        if (query) filterQuery.title = { $regex: query, $options: "i" }

        const totalQuestions = await Question.countDocuments(filterQuery);
        const questions = await Question.find(filterQuery)
            .select("_id title views answers upvotes downvotes author createdAt")
            .populate([
                { path: "author", select: "name image" },
                { path: "tags", select: "name" }
            ])
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const isNext = totalQuestions < skip + questions.length;

        return {
            success: true,
            data: {
                tag: JSON.parse(JSON.stringify(tag)),
                questions: JSON.parse(JSON.stringify(questions)),
                isNext
            }
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

// Make a call to the 'Questions' model and find the questions that contain this tag
// Make a call to the 'TagQuestions' model and find all related questions together by finding different documents that have the tags mentioned in them

