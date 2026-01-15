import React from 'react'
import UserAvatar from "@/components/UserAvatar";
import {getQuestion, incrementViews} from "@/lib/actions/question.actions";
import {notFound, redirect} from "next/navigation";
import Link from "next/link";
import {ROUTES} from "@/constants/routes";
import Metric from "@/components/Metric";
import {formatNumber, getTimestamp} from "@/lib/utils";
import TagCard from "@/components/cards/TagCard";
import Preview from "@/components/editor/Preview";
import AnswerForm from "@/components/forms/AnswerForm";
import {getAnswers} from "@/lib/actions/answer.actions";
import AllAnswers from "@/components/answers/AllAnswers";

// - ** Initial Page Load: ** When a user visits the question details page, the server renders the page with the current view count. This is because the page is a server component, so it's getting executed right on the server.
// - ** View Count Increment: ** After the page is loaded, a server action is called to increment the view count in the database. This server action is called from the client side, meaning only after the page has been rendered, dom has been created, and a client call is made through `useEffect`.
// - ** Stale Data Issue: ** The problem arises because the page was rendered and served to the client before the view count was incremented. This means the user doesn't see the updated view count immediately.
// - ** Delayed Update: ** Thus, the user would only see the updated view count if they navigate away and then return to the page or if they refresh the page.

const QuestionDetails = async ({ params }: RouteParams) => {
    const { id } = await params;
    if (!id) return notFound();

    const [_, { success, data: question }] = await Promise.all([
        await incrementViews({ questionId: id }),
        await getQuestion({ questionId: id })
    ])

    if (!success || !question) return redirect('/404');

    const {
        success: answersLoaded,
        data: answersResult,
        error: answersError
    } = await getAnswers({
        questionId: id,
        page: 1,
        pageSize: 10,
        filter: 'latest'
    });

    const { author, createdAt, answers, views, tags, content, title } = question;

    return (
        <>
            <div className="flex-start w-full flex-col">
                <div className="flex w-full flex-col-reverse justify-between">
                    <div className="flex items-center justify-start gap-1">
                        <UserAvatar
                            id={author && author._id ? author._id : 'Anonymous'}
                            name={author && author.name ? author.name : 'Anonymous'}
                            className="size-[22px]"
                            fallbackClassName="text-[10px]"
                        />

                        <Link href={author && author._id ? ROUTES.PROFILE(author._id) : ROUTES.HOME}>
                            <p className="paragraph-semibold text-dark300_light700">{author && author.name ? author.name : 'Anonymous'}</p>
                        </Link>
                    </div>

                    <div className="flex justify-end">
                        <p>Votes</p>
                    </div>
                </div>

                <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full">
                    {title}
                </h2>
            </div>

            <div className="mb-8 mt-5 flex flex-wrap gap-4">
                <Metric
                    imageURL="/icons/clock.svg"
                    alt="clock icon"
                    value={` asked ${getTimestamp(new Date(createdAt))}`}
                    title=""
                    textStyles="small-medium text-dark400_light700"
                />
                <Metric
                    imageURL="/icons/message.svg"
                    alt="message icon"
                    value={answers}
                    title=""
                    textStyles="small-medium text-dark400_light700"
                />
                <Metric
                    imageURL="/icons/eye.svg"
                    alt="eye icon"
                    value={formatNumber(views)}
                    title=""
                    textStyles="small-medium text-dark400_light700"
                />
            </div>

            <Preview content={content} />

            <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag: Tag) => (
                    <TagCard
                        key={tag._id}
                        _id={tag._id as string}
                        name={tag.name}
                        compact
                    />
                ))}
            </div>

            <section className="my-5">
                <AllAnswers
                    data={answersResult?.answers}
                    success={answersLoaded}
                    error={answersError}
                    totalAnswers={answersResult?.totalAnswers || 0}
                />
            </section>

            <section className="my-5">
                <AnswerForm questionId={question._id} questionTitle={question.title} questionContent={question.content} />
            </section>
        </>
    )
}
export default QuestionDetails
