import React from 'react'
import QuestionForm from "@/components/forms/QuestionForm";
import {auth} from "@/auth";

const Ask_Question = async () => {
    const session = await auth();
    return (
        <>
            <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

            <div className="mt-9">
                <QuestionForm />
            </div>
        </>
    )
}
export default Ask_Question
